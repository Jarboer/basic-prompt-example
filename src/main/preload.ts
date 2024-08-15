/*  Preload Script: preload.ts

    The preload script runs before the renderer process is loaded, and has access to both 
    Renderer globals (e.g. window and document) and a Node.js environment.

    See the Electron documentation for details on how to use preload scripts:
    https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
*/

// FIXME: May be unsafe

// Import the required modules
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const electronHandler = {
  /**
   * This is used to define the wrapper ipcRenderer methods.
   */
  ipcRenderer: {
    /**
     * This method is used to send to send an asynchronous message to the main process.
     *
     * This is just a wrapper for {@link https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendchannel-args ipcRenderer.send},
     * so follow its docs for specifics.
     *
     * @param channel The channel for communication to the main process
     * @param args The optional arguments to send to the main process
     */
    send(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    /**
     * This method is used to register a listener function to receive data from the main process whenever a message is received on the specified channel.
     *
     * This is just a wrapper for {@link https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendereronchannel-listener ipcRenderer.on},
     * so follow its docs for specifics.
     *
     * @param channel  The channel to listen to for communication from the main process
     * @param func The listener function to be called when a message is received. It may contain arguments
     */
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    /**
     * This method is used to register a one-time listener function to receive data from the main process on the specified channel.
     *
     * This is just a wrapper for {@link https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendereroncechannel-listener ipcRenderer.once},
     * so follow its docs for specifics.
     *
     * @param channel The channel to listen to for communication from the main process
     * @param func The listener function to be called when a message is received. It may contain arguments
     */
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  /**
   * This function is used to add a onClick listener to each button.
   *
   * The main process can then listen for the button click using ipcMain and using the channel: '`elementName`-clicked'.
   *
   * @param elementName The name of the element to add a listener to
   */
  addClickListener(elementName: MainWindowButtons) {
    // Define the element being modified
    const buttonElement = document.getElementById(elementName);

    // If the button element is not found / null then display an error
    if (buttonElement === null) {
      throw new Error(`*** Unable to add listener to ${elementName} as the element wasn't found. ***`);
    } else {
      // Add a listener to the button for when it is clicked
      buttonElement.addEventListener('click', () => {
        // Send an event to the main process when the button is clicked
        ipcRenderer.send(`${elementName}-clicked`);
      });
    }
  },
};

// Use contextBridge to expose the defined methods in the render
// For more information see this link: https://stackoverflow.com/a/69917666
contextBridge.exposeInMainWorld('electron', electronHandler);

// Define the ElectronHandler type as electronHandler
export type ElectronHandler = typeof electronHandler;
