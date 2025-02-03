const { spawn } = require("child_process");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false;

let mainWindow;

app.whenReady().then(() => {
  const preload = path.join(__dirname, "preload.cjs");

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  if (IS_DEV) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else
    mainWindow.loadURL(
      `file://${path.join(__dirname, "..", "dist", "index.html")}`
    );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

ipcMain.handle("run-oc-finder", async (_, width, height, filePath) => {
  return new Promise((resolve) => {
    // TODO: move to env
    const scriptPath = "C:/Users/LMA/OC_Finder/run_oc_finder.bat";

    const process = spawn(scriptPath, [width, height, filePath], {
      shell: true,
    });

    let output = "";
    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      output += data.toString();
    });

    process.on("close", () => resolve(output));
  });
});
