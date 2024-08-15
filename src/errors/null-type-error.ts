/**
 * NullTypeError: null-type-error.ts
 * Written: Aug 9th, 2023
 */

/**
 * This error should be called if the variable called was null
 */
export default class NullTypeError extends Error {
  /**
   * This error should be called if the variable called was null
   *
   * @param varName The name of the variable that was null
   */
  constructor(varName?: string) {
    // If a varName was provided then show it
    if (varName) {
      super(`*** The variable called "${varName}" could not be referenced as it is null. ***`);
    } else { // Otherwise, show a generic message
      super('*** The variable could not be referenced as it is null. ***');
    }

    // Set the prototype
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
