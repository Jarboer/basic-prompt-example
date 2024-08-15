// preload.d.ts
// This is a type declaration file (https://code.visualstudio.com/docs/nodejs/working-with-javascript#_type-checking-javascript)

// TODO: Could I define the channel name and the expected args using an interface or something similar? Or extending the func

// Define the typings for the ipcRenderer methods and addClickListener
interface ElectronHandler {
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
    send(channel: Channels, ...args: unknown[]): void;
    /**
     * This method is used to register a listener function to receive data from the main process whenever a
     * message is received on the specified channel.
     *
     * This is just a wrapper for {@link https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendereronchannel-listener ipcRenderer.on},
     * so follow its docs for specifics.
     *
     * @param channel  The channel to listen to for communication from the main process
     * @param func The listener function to be called when a message is received. It may contain arguments
     */
    on(channel: Channels, func: (...args: unknown[]) => void): () => void;
    /**
     * This method is used to register a one-time listener function to receive data from the main process whenever a
     * message is received on the specified channel.
     *
     * This is just a wrapper for {@link https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendereroncechannel-listener ipcRenderer.once},
     * so follow its docs for specifics.
     *
     * @param channel The channel to listen to for communication from the main process
     * @param func The listener function to be called when a message is received. It may contain arguments
     */
    once(channel: Channels, func: (...args: unknown[]) => void): void;
  };
  /**
   * This function is used to add a onClick listener to each button.
   *
   * The main process can then listen for the button click using ipcMain and using the channel: '`elementName`-clicked'.
   *
   * @param elementName The name of the element to add a listener to
   */
  addClickListener(elementName: MainWindowButtons): void;
}

// Declare the following globally
declare global {
  // Declare the Window interface (for all renderers and add a new property) to include a property called electron
  // which defines declared methods in the preload file
  interface Window {
    /**
     * The API to allow communication back to the main process from the renderer
     *
     * @author Jarrett Boersen
     */
    electron: ElectronHandler;
  }

  /**
   * Define the allow Channels for the ipcRenderer on window.electron
   */
  // prettier-ignore
  export type Channels = 'renderer-error' | 'renderer-warning';
  /**
   * Define the allowed buttons (related to main window) for the elementName property of addClickListener() on window.electron
   */
  // prettier-ignore
  export type MainWindowButtons = 'login-btn';
}

export {};
