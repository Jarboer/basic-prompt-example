/**
 * This file is used to bring functionality to the index page
 */

// This code will run when the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Define the buttons to add listeners to
  const buttons: MainWindowButtons[] = ['login-btn', 'select-style-btn', 'login-single-btn'];

  // Loop through all the buttons and add a listener to each one
  buttons.forEach((button) => {
    window.electron.addClickListener(button);
  });
});
