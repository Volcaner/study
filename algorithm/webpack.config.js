const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const srcDir = __dirname + '/src';
const jsPath = path.resolve(srcDir, 'js');
const dirs = fs.readdirSync(jsPath);
const hotmodulereplace = new webpack.HotModuleReplacementPlugin();
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log("----------------------------------------------" + srcDir);

const config = {
	output: {
		filename: 'js/[name].js',
		path: __dirname + '/dist',
		publicPath: '',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					query: {
						plugins: ['transform-runtime'],
						presets: ['es2015', 'stage-0']
					}
				}
			},
		],
	},
	watch: true,
	plugins: [
		// hotmodulereplace,
	],
	devServer: {},
	externals: {},
};

config.entry = getEntry();
function getEntry() {
	var files = {};
	var matchs = [];

	dirs.forEach(function(item, index) {
		matchs = item.match(/(.+)\.js$/);
		if(matchs) {
			files[matchs[1]] = path.resolve(srcDir, 'js', item);

			console.log(files[matchs[1]]);

			var htmlplugin = new HtmlWebpackPlugin({
				filename: 'html/' + matchs[1] + '.html',
				template: srcDir + '/html/' + matchs[1] + '.html',
				inject: 'body',
				title: 'this is index.html',
				chunks: [matchs[1]],
				hash: true,
			});
			config.plugins.push(htmlplugin);
		}
	});
	return files;
};

module.exports = config;