import { BrowserWindow } from 'electron';

// Import the required modules
// TODO: Change to dependency
import electronPrompt, { ElectronPromptOptions } from 'C://Users/jboersen/Developer/Node.js/electron-prompt'; // require('@jarboer/electron-prompt')

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
    placeholder: 'Username',
    resizable: true, // TODO: Remove?? For testing
    devMode: true, // TODO: Remove?? For testing
    inputAttrs: {
      type: 'text',
      required: true,
    },
  });

  // Prompt for the user's password
  const password = await betterPrompt({
    title: 'Add Credentials',
    label: 'Please enter your password',
    placeholder: 'Password',
    resizable: true, // TODO: Remove?? For testing
    devMode: true, // TODO: Remove?? For testing
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
export async function betterPrompt(promptInfo: ElectronPromptOptions, window?: BrowserWindow): Promise<string | null> {
  // Used to store the result from the user
  let result: string | null = null;

  // Prompt for the user's password
  await electronPrompt(promptInfo, window)
    .then((r: any) => {
      // If the result is null then the user canceled
      if (r === null) {
        // Used to store the message about the prompt that was canceled
        let msg = `The user canceled the ${promptInfo.type ?? 'input'} prompt`;

        if (promptInfo.title !== undefined && promptInfo.label !== undefined) {
          msg += ` with the title "${promptInfo.title}" and the label "${promptInfo.label}"`;
        } else if (promptInfo.title !== undefined) {
          msg += ` with the title "${promptInfo.title}"`;
        } else if (promptInfo.label !== undefined) {
          msg += ` with the label "${promptInfo.label}"`;
        }

        // Display the message
        console.log(`${msg}.`)
      }

      // Set the result from the user
      result = r;
    })
    .catch(console.error); // Show the error if one occurred

  return result;
}
