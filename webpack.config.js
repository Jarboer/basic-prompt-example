// TODO: Make automatic (mainly the web stuff using loops)

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = [
  // Node
  {
    watch: false,
    mode: 'development', //   mode: 'production',
    devtool: 'source-map', // TODO: Remove on publish
    target: 'node', // use require() & use NodeJs CommonJS style
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
      node: true, // in order to ignore built-in modules like path, fs, etc.
    },
    entry: {
      main: { import: './src/main/main.ts', filename: 'main/[name].bundle.js' },
      preload: { import: './src/main/preload.ts', filename: 'main/[name].js' },
      // Add more entries as needed
    },
    output: {
      clean: true,
      pathinfo: true, // For debugging
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  // Web
  {
    watch: false,
    mode: 'development', //   mode: 'production',
    devtool: 'inline-source-map', // TODO: Remove on publish
    target: 'web', // use require() & use NodeJs CommonJS style
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    // externalsPresets: {
    //   node: true, // in order to ignore built-in modules like path, fs, etc.
    // },
    entry: {
      'main-menu': {
        import: './src/renderers/main-menu/main-menu.ts',
        filename: 'renderers/[name]/[name].bundle.js',
      },
      // Add more entries as needed
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // {
        //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //   type: 'asset/resource',
        // },
        //   {
        //     test: /\.css$/,
        //     use: ['style-loader', 'css-loader'],
        //   },
        //   {
        //     test: /\.html$/,
        //     use: 'html-loader',
        //   },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/renderers/main-menu/main-menu.html',
        chunks: ['main-menu'],
        filename: 'renderers/main-menu/main-menu.html',
        inject: false, // Disable automatic injection
      }),
      // new HtmlWebpackInlineSVGPlugin({
      //   inlineAll: true,
      //   runPreEmit: true,
      //   svgoConfig: [
      //     { removeViewBox: false }, // Preserve the viewBox attribute
      //   ],
      // }),
      // Add more HtmlWebpackPlugin instances as needed
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/renderers/common', to: 'renderers/common' },
          {
            from: 'src/renderers/main-menu/main-menu.css',
            to: 'renderers/main-menu',
          }
          // Add more patterns as needed
        ],
      }),
    ],
  },
];
