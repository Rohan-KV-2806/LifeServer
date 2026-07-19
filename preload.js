const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startServer: (port, host, directory) => ipcRenderer.invoke('start-server', port, host, directory),
  stopServer: () => ipcRenderer.invoke('stop-server'),
})
