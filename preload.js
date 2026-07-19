const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startServer: (port, directory) => ipcRenderer.invoke('start-server', port, directory),
  stopServer: () => ipcRenderer.invoke('stop-server'),
})
