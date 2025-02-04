const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  runScript: (
    width,
    height,
    filePath,
    scriptPath,
    ocFinderPath,
    condaActivatePath
  ) =>
    ipcRenderer.invoke(
      "run-oc-finder",
      width,
      height,
      filePath,
      scriptPath,
      ocFinderPath,
      condaActivatePath
    ),
});
