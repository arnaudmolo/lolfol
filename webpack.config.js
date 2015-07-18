// WEBPACK DOC : http://webpack.github.io/docs/

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const appScripts = [path.resolve(__dirname, "modules", "_app.jsx")];
const modulesPath = path.resolve(__dirname, "modules");
const buildPath = path.resolve(__dirname, "build");

const hotScripts = [
  // WebpackDevServer host and port
  'webpack-dev-server/client?http://0.0.0.0:8080',
  // WebpackDevServer hot reload
  'webpack/hot/only-dev-server'
];

const getconfig = function(exportPath) {

  if (!exportPath) exportPath = buildPath;

  return {
    //  A SourceMap without column-mappings. SourceMaps from loaders are simplified to a single mapping per line
    devtool: "eval",

    // cache hotscripts for dev-server.js
    hotScripts: hotScripts,

    // Cache generated modules and chunks to improve performance for multiple incremental builds
    cache: true,

    // Enter watch mode (or not), which rebuilds on file change
    watch: false,

    // The entries point for the bundle
    entry: {
      "bundle":  appScripts
    },

    // Options affecting the output
    output: {
      // path of output
      path : exportPath,
      // [name] is replaced by the name of the chunk
      filename: 'scripts/[name].js',
      // public path for files serving
      publicPath: '/',
    },

    resolve : {
      // An array of extensions that should be used to resolve modules
      extensions: ['', '.js', '.jsx', '.scss'],
      // Replace modules by other modules or paths
      alias : {}
    },

    // Loaders are transformations that are applied on a resource file of your app
    module: {
      loaders: [
        // babel loader for ES6-7
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: ["babel-loader"],
        },

        // scss/sass loader with style extraction (ref ExtractTextPlugin)
        // width path resolving & source map
        {
          test: /\.scss$/,
          loader: [
            "style-loader",
            "css-loader",
            "sass-loader?sourceMap&includePaths[]=" + modulesPath,
          ].join("!"),
        },
      ]
    },

    plugins: [
      // Generate an extra chunk, which contains common modules shared between entry points
      new webpack.optimize.CommonsChunkPlugin("scripts/init.js"),
      // automatically add scripts/styles file to index.html
      new HtmlWebpackPlugin({
        // Load a custom template
        template: path.resolve(buildPath, 'index.html'),
        // Inject all scripts into the body
        inject: 'body'
      })
    ]
  }
};

const config = getconfig();
config.setPath = getconfig;

module.exports = config;
