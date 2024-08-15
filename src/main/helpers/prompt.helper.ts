import { BrowserWindow } from 'electron';

// Import the required modules
const prompt = require('@jarboer/electron-prompt');

/**
 * Used to define an input element's type
 */
// prettier-ignore
type InputElement = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' |
    'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

/**
 * Used to define the prompt's information object
 */
export interface PromptInfo {
  /**
   * The title of the prompt window. Defaults to 'Prompt'.
   */
  title?: string;
  /**
   * The label which appears on the prompt for the input field. Defaults to 'Please input a value:'.
   */
  label?: string;
  /**
   * The text for the OK/cancel buttons. Properties are 'ok' and 'cancel'. Defaults to null.
   */
  buttonLabels?: object;
  /**
   * The default value for the input field. Defaults to null.
   */
  value?: string;
  /**
   *  The type of input field, either 'input' for a standard text input field or 'select' for a dropdown type input. Defaults to 'input'.
   */
  type?: 'input' | 'select';
  /**
   * The attributes of the input field, analogous to the HTML attributes: `{type: 'text', required: true}` -> `<input type="text" required>`.
   * Used if the type is 'input'
   */
  inputAttrs?: {
    type: InputElement;
    required: boolean;
  };
  /**
   * The items for the select dropdown if using the 'select' type in the format 'value': 'display text', where the value is what will be given
   * to the then block and the display text is what the user will see.
   */
  selectOptions?: object;
  /**
   * Whether the label should be interpreted as HTML or not. Defaults to false.
   */
  useHtmlLabel?: boolean;
  /**
   * The width of the prompt window. Defaults to 370.
   */
  width?: number;
  /**
   * The minimum allowed width for the prompt window. Same default value as width.
   */
  minWidth?: number;
  /**
   * The height of the prompt window. Defaults to 130.
   */
  height?: number;
  /**
   * The minimum allowed height for the prompt window. Same default value as height.
   */
  minHeight?: number;
  /**
   * Whether the prompt window can be resized or not (also sets useContentSize). Defaults to false.
   */
  resizable?: boolean;
  /**
   * Whether the window should always stay on top of other windows. Defaults to false
   */
  alwaysOnTop?: boolean;
  /**
   * The path to an icon image to use in the title bar. Defaults to null and uses electron's icon.
   */
  icon?: string;
  /**
   * The local path of a CSS file to stylize the prompt window. Defaults to null.
   */
  customStylesheet?: string;
  /**
   * Whether to show the menubar or not. Defaults to false.
   */
  menuBarVisible?: boolean;
  /**
   * Whether to show the prompt window icon in taskbar. Defaults to true.
   */
  skipTaskbar?: boolean;
  /**
   * Whether to only show the prompt window once content is loaded. Defaults to false.
   */
  showWhenReady?: boolean;
}

/**
 * This method is used to get the login credentials from the user
 *
 * @returns The user's credentials
 */
export async function getLoginCredentials() {
  /**
   * Used to store the result of the user's inputs for credentials
   */
  let result = {
    username: '',
    password: '',
  };

  // Prompt for the user's username
  const username = await betterPrompt({
    title: 'Add Credentials',
    label: 'Please enter your username',
    inputAttrs: {
      type: 'text',
      required: true,
    },
  });

  // Prompt for the user's password
  const password = await betterPrompt({
    title: 'Add Credentials',
    label: 'Please enter your password',
    inputAttrs: {
      type: 'password',
      required: true,
    },
  });

  // Store the credentials in the result and convert the null vals to ""
  result.username = username ?? '';
  result.password = password ?? '';

  return result;
}

/**
 * This method is used as a wrapper to create a better prompt
 *
 * @param promptInfo The PromptInfo object to define how the prompt will look
 * @param window The window to display the prompt on
 * @returns The result of the prompt after the user interacts with it
 */
export async function betterPrompt(promptInfo: PromptInfo, window?: BrowserWindow): Promise<string | null> {
  // Used to store the result from the user
  let result: string | null = null;

  // Prompt for the user's password
  await prompt(promptInfo) // FIXME: Had to remove ", window" as it was causing crashes
    .then((r: any) => {
      // If the result is null then the user canceled
      if (r === null) {
        // Display that the user canceled
        if (promptInfo.inputAttrs?.type != undefined) {
          console.log(`The user canceled while entering the ${promptInfo.inputAttrs.type}.`);
        } else {
          console.log(`The user canceled the prompt.`);
        }
      }

      // Set the result from the user
      result = r;
    })
    .catch(console.error); // Show the error if one occurred

  return result;
}
