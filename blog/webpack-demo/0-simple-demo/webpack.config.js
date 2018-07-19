/**
	"start": "webpack --config mywebpack.config.js"
**/

const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinifier = require('html-minifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const NamedModulesPlugin = new webpack.NamedModulesPlugin();
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');


const extractCss = new ExtractTextPlugin({
	filename: './css/[name].css'
});

const config = {
	output: {
		path: path.resolve(ROOT_PATH, './dist/'),
		filename: process.env.NODE_ENV === 'production' ? './js/[name].[hash].js' : './js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: extractCss.extract({
					fallback: 'style-loader',
					use: [
						{loader: 'css-loader?limit=10000&name=css/[name].[ext]'}
						// {loader: 'px2rem-loader?remUnit=46.875&remPrecision=8'}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: ['es2015'],
						plugins: ['transform-runtime']
					}
				}
			}
		]
	},
	plugins: [

		/**
			提取公共代码 至 common.js
		**/
		new webpack.optimize.CommonsChunkPlugin({
			name: ['manifest'],
			// filename: './js/[name].js',
			// chunks: [  // 限定只使用这些入口 chunk
			// 	'app',
			// 	'main'
			// ],
			minChunks: Infinity,
			// minSize: 1000,
			// async: true
			// minChunks: function(module) {
			// 	// 该配置假定你引入的 vendor 存在于 node_modules 目录中
			// 	return module.context && module.context.indexOf('node_modules') !== -1;
			// }
		}),

		/**
			生成对应模块的 html，并引入相应 js文件
		**/
		// new HtmlWebpackPlugin({
		// 	title: 'My Test',
		// 	path: path.resolve(ROOT_PATH, './dist/'),
		// 	// publicPath: './',
		// 	filename: './html/app.html',
		// 	template: path.resolve(ROOT_PATH, './src/template/template.html'),
		// 	chunks: ['app', 'moment', 'manifest'],
		// 	inject: 'body',
		// 	minify: HtmlMinifier.minify,
		// 	meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
		// 	// favicon: path.resolve(ROOT_PATH, './src/image/logo.ico')
		// }),
		// new HtmlWebpackPlugin({
		// 	title: 'My Test',
		// 	path: path.resolve(ROOT_PATH, './dist/'),
		// 	filename: './html/main.html',
		// 	chunks: ['main', 'moment', 'manifest'],
		// 	inject: 'body'
		// }),

		extractCss,
		HotModuleReplacementPlugin,  // 开启全局的模块热替换
		// NamedModulesPlugin  // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息

		new UglifyjsPlugin({
			// cache: true,
			sourceMap: true
			// ,
			// uglifyOptions: {
			// 	output: {
			// 		beautify: true
			// 	}
			// }
		})
	],
	devServer: {
		contentBase: path.resolve(ROOT_PATH, './dist/'),
		inline: true,
		hot: true,
		port: 3000
	},
	// watch: true
};

const entry = {
	moment: 'moment'
};
const simplePoint = require('./build/entry-simplepoint.js');
config.entry = Object.assign({}, entry, simplePoint);  // Object.assign() 浅拷贝

for (key in simplePoint) {
	const pluginObj = new HtmlWebpackPlugin({
		title: 'My Test',
		path: path.resolve(ROOT_PATH, './dist/'),
		// publicPath: './',
		filename: './html/' + key + '.html',
		template: path.resolve(ROOT_PATH, './src/template/template.html'),
		chunks: ['manifest', 'moment', key],
		inject: 'head',
		minify: HtmlMinifier.minify,
		meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
		// favicon: path.resolve(ROOT_PATH, './src/image/logo.ico')
	});

	config.plugins.push(pluginObj);
}

module.exports = config;
