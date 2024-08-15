/**
 * Main File: main.ts
 *
 * To run the app enter the command: pnpm start
 */

// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

// Import the helper modules
import { getLoginCredentials } from './helpers/prompt.helper';
import NullTypeError from '../errors/null-type-error';

/**
 * Used to store the mainWindow object
 *
 * It is null when not initialized
 */
let mainWindow: BrowserWindow | null;

/**
 * This function is used to create the browser window and preform actions
 */
const createMainWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 920,
    height: 650,
    minWidth: 590,
    minHeight: 400,
    icon: path.join(__dirname, '../../resources/icons/appIcon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Call the preload script
      // TODO: Do I need node integration enabled?
      // nodeIntegration: true, // Enable Node.js integration in the renderer process
      devTools: true, // Disable chrome dev tools for the main window // FIXME: Disable for final exe
    },
  });

  // Load the main-menu.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../renderers/main-menu/main-menu.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  /* ------------------- End of basic functions ------------------- */

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Once the window is ready to show run the following
  // mainWindow.once('ready-to-show', () => {
  // });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/* ------------------- Handlers for main-menu ------------------- */

// This event is called when the plex button is clicked
ipcMain.on('login-btn-clicked', async (event, arg) => {
  // NOTE: Can remove event, arg
  console.log('Login button pressed');

  // Get the credentials from the user
  const userCredentials = await getLoginCredentials();

  // If the credentials from the user aren't blank then store them
  if (userCredentials.username != '' && userCredentials.password != '') {
    console.log('Username:', userCredentials.username);
    console.log('Password:', userCredentials.password);
  } else {
    console.log('No credentials returned');
  }

  // Do something with the creds...
});

/* ------------------- End of handlers for main-menu ------------------- */

/**
 * This method is used to check if the window is null
 *
 * @param window The window to check
 * @returns The window if it isn't null
 * @throws `NullTypeError` if the window is null
 */
export function isWindowNull(window: BrowserWindow | null) {
  // If the window is null then display an error
  if (window === null) {
    throw new NullTypeError('window');
  } else {
    // Otherwise, return false
    return window;
  }
}
