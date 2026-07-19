const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const http = require('http')
const fs = require('fs')

let mainWindow = null
let server = null
let fileWatcher = null
const sseClients = []

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ts': 'text/javascript',
  '.jsx': 'text/javascript',
  '.tsx': 'text/javascript',
}

const LIVE_RELOAD_SCRIPT = `
<script>
(function() {
  var es = new EventSource('/__livereload');
  es.onmessage = function(e) {
    if (e.data === 'reload') location.reload();
  };
  es.onerror = function() {
    es.close();
    setTimeout(function() {
      location.reload();
    }, 2000);
  };
})();
</script>
`.trim()

function injectLiveReload(content, ext) {
  if (ext === '.html') {
    const str = content.toString('utf8')
    // Only inject if not already present
    if (str.includes('/__livereload')) return content
    return str.replace('</body>', LIVE_RELOAD_SCRIPT + '\n</body>')
  }
  return content
}

function serveStaticFile(res, filePath, ext) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 Not Found')
      return
    }
    const content = injectLiveReload(data, ext)
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' })
    res.end(content)
  })
}

function notifyReload() {
  sseClients.forEach(client => {
    client.res.write('data: reload\n\n')
  })
}

function startServer(port, directory) {
  try {
    const dir = path.resolve(directory)

    if (!fs.existsSync(dir)) {
      return { success: false, error: `Directory not found: ${dir}` }
    }

    server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${port}`)

      // SSE endpoint for live reload
      if (url.pathname === '/__livereload') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        })
        res.write('data: connected\n\n')

        const client = { res }
        sseClients.push(client)

        req.on('close', () => {
          const idx = sseClients.indexOf(client)
          if (idx !== -1) sseClients.splice(idx, 1)
        })
        return
      }

      let filePath = path.join(dir, url.pathname === '/' ? 'index.html' : url.pathname)
      const ext = path.extname(filePath).toLowerCase()

      // If path has no extension and is a directory, try index.html
      if (!ext) {
        try {
          const stat = fs.statSync(filePath)
          if (stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html')
          }
        } catch (_) {
          // stat failed, continue with original path
        }
      }

      const finalExt = path.extname(filePath).toLowerCase()
      serveStaticFile(res, filePath, finalExt || '.html')
    })

    return new Promise((resolve) => {
      // Try listening; if port is taken, try next port
      const tryListen = (p) => {
        server.listen(p, () => {
          // Start watching directory for changes
          try {
            if (fileWatcher) fileWatcher.close()
            fileWatcher = fs.watch(dir, { recursive: true }, (eventType, filename) => {
              if (filename && !filename.startsWith('.')) {
                notifyReload()
              }
            })
          } catch (e) {
            console.warn('File watching limited:', e.message)
          }

          resolve({ success: true, port: p, directory: dir, url: `http://localhost:${p}` })
        })

        server.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            server.close()
            tryListen(p + 1)
          } else {
            resolve({ success: false, error: err.message })
          }
        })
      }

      tryListen(parseInt(port))
    })
  } catch (err) {
    return { success: false, error: err.message }
  }
}

function stopServer() {
  // Notify and close SSE clients
  sseClients.forEach(client => {
    try {
      client.res.write('data: shutdown\n\n')
      client.res.end()
    } catch (_) {}
  })
  sseClients.length = 0

  // Close file watcher
  if (fileWatcher) {
    fileWatcher.close()
    fileWatcher = null
  }

  // Close HTTP server
  if (server) {
    server.close()
    server = null
    return { success: true }
  }
  return { success: false, error: 'No server running' }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 520,
    height: 680,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'))
}

app.whenReady().then(() => {
  ipcMain.handle('start-server', (_event, port, directory) => {
    return startServer(port, directory)
  })

  ipcMain.handle('stop-server', () => {
    return stopServer()
  })

  createWindow()
})

app.on('window-all-closed', () => {
  stopServer()
  if (process.platform !== 'darwin') app.quit()
})
