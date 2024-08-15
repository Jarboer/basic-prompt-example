/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  useTabs: false,
  bracketSameLine: false,
  printWidth: 140,
  overrides: [
    // {
    //     files: ["*.css", "*.js"],
    //     options: {
    //         tabWidth: 4,
    //     },
    // },
    {
        files: ["*.html"],
        options: {
            printWidth: 100,
        },
    },
  ],
};

module.exports = config;
