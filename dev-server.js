require("babel-core/polyfill");

const path = require("path");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const buildPath = path.resolve(__dirname, "build");
const serverPort = 8080;

// get build config for webpack
const config = require('./webpack.config.js');

// affect dev-server parameters
Object.assign(config, {
  // enable file watching
  watch: true,
  // add HMR plugin for hot-loading
  plugins: config.plugins.concat([new webpack.HotModuleReplacementPlugin()]),
  // add HMR needed scripts
  entry: {
    "bundle" : config.entry["bundle"].concat(config.hotScripts)
  }
});

// add react-hot-loader for jsx files
const JSX = config.module.loaders.find(function(d){ return d.test.toString().indexOf("jsx") > -1 });
JSX.loaders.unshift('react-hot');

// dev-server config
const devConfig = {
  // public path for files serving
  publicPath: config.output.publicPath,
  // enable HMR
  hot: true,
  // no-hashbang-navigation ready
  historyApiFallback: true,
  // content base for server
  contentBase: buildPath
};

// start dev-server based on webpack with the config
new WebpackDevServer(webpack(config), devConfig)
    .listen(serverPort, '0.0.0.0', function (err, result) {
        if (err) console.log(err);

        console.log('    ___   _ _____ ___   _______   _____ ___ ')
        console.log('   |   \\ /_\\_   _/_\\ \\ / / __\\ \\ / / __/ __|')
        console.log('   | |) / _ \\| |/ _ \\ V /| _| \\ V /| _|\\__ \\')
        console.log('   |___/_/ \\_\\_/_/ \\_\\_/ |___| |_| |___|___/ \n');

        console.log('   Listening at 0.0.0.0:'+serverPort);
    });
