const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  runScript: (width, height, filePath) =>
    ipcRenderer.invoke("run-oc-finder", width, height, filePath),
});
