const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const portInput = document.getElementById('port')
const dirInput = document.getElementById('dir')
const statusEl = document.getElementById('status')
const serverInfoEl = document.getElementById('serverInfo')

function setStatus(text, type) {
  statusEl.textContent = text
  statusEl.className = 'status-box ' + type
}

function setServerInfo(text, url) {
  if (url) {
    serverInfoEl.innerHTML = text + ' — <a href="' + url + '" target="_blank">' + url + '</a>'
  } else {
    serverInfoEl.textContent = text
  }
  serverInfoEl.classList.toggle('show', !!text)
}

function setButtonsState(running) {
  startBtn.disabled = running
  stopBtn.disabled = !running
  portInput.disabled = running
  dirInput.disabled = running
}

startBtn.addEventListener('click', async () => {
  const port = portInput.value.trim() || '5500'
  const dir = dirInput.value.trim() || '.'

  startBtn.textContent = '⏳ Starting...'
  startBtn.disabled = true

  const result = await window.electronAPI.startServer(port, dir)

  if (result.success) {
    setStatus('✅ Server running on port ' + result.port, 'success')
    setServerInfo('Serving: ' + result.directory, result.url)
    setButtonsState(true)
  } else {
    setStatus('❌ ' + (result.error || 'Failed to start server'), 'error')
    startBtn.textContent = '▶ Start Server'
    startBtn.disabled = false
  }
})

stopBtn.addEventListener('click', async () => {
  stopBtn.textContent = '⏳ Stopping...'
  stopBtn.disabled = true

  const result = await window.electronAPI.stopServer()

  if (result.success) {
    setStatus('⏹ Server stopped', 'info')
    setServerInfo('', '')
    setButtonsState(false)
    startBtn.textContent = '▶ Start Server'
  } else {
    setStatus('⚠️ ' + (result.error || 'Failed to stop server'), 'error')
    stopBtn.textContent = '⏹ Stop Server'
    stopBtn.disabled = false
  }
})
