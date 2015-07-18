require('babel-core/polyfill');

const path = require('path');
const fs = require('fs');
const del = require('del');
const uglify = require("uglify-js");
const ncp = require('ncp').ncp;
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// The 'concurrency limit' is an integer that represents how many pending file system requests ncp has at a time
ncp.limit = 16;

const modulesPath = path.resolve(__dirname, "modules");
const buildPath = path.resolve(__dirname, 'build');
const distPath = path.resolve(__dirname, 'dist');
const config = require('./webpack.config.js').setPath(distPath);

// add ExtractTextPlugin for extract off scss compiled to a styles.css file
const scssLoader = config.module.loaders.find(function(d){ return d.test.toString().indexOf("scss") > -1 });
scssLoader.loader = ExtractTextPlugin.extract("style-loader", [
  "css-loader",
  "sass-loader?sourceMap&includePaths[]=" + modulesPath,
].join("!"))

console.log('    ___   _ _____ ___   _______   _____ ___ ')
console.log('   |   \\ /_\\_   _/_\\ \\ / / __\\ \\ / / __/ __|')
console.log('   | |) / _ \\| |/ _ \\ V /| _| \\ V /| _|\\__ \\')
console.log('   |___/_/ \\_\\_/_/ \\_\\_/ |___| |_| |___|___/ \n');

const START = Date.now();

// Extract text from bundle into a file (scss loader)
config.plugins.push(new ExtractTextPlugin("styles.css"));
// Uglify files
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
// remove duplicate dependencies
config.plugins.push(new webpack.optimize.DedupePlugin());
// Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
// This make ids predictable, reduces to total file size and is recommended.
config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());

// clean dist directory
del([distPath], function (err, paths) {
	console.log('Deleting \t', paths.join('\n'));

	// create dist folder
	fs.mkdirSync(distPath);
	 
	// copy assets and stuff from ./build
	ncp(buildPath, distPath, function (err) {
		if (err) return console.error(err);
	 
		console.log('Coping \t\t', buildPath, '->', distPath)

		// compile files with webpack (based on config)
		webpack(config).run(function(err, stats) {
			console.log('Compiling \t', distPath, "\n");
			console.log('Total \t\t', Date.now()-START, "ms");
		});
	});
});