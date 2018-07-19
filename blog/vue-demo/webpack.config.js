/**
	"start": "webpack --config mywebpack.config.js"
**/

const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
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
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader'
                }
            },
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
			生成对应模块的 html，并引入相应 js文件
		**/
		new HtmlWebpackPlugin({
			title: 'My Test',
			path: path.resolve(ROOT_PATH, './dist/'),
			// publicPath: './',
			filename: './html/index.html',
			template: path.resolve(ROOT_PATH, './src/template/template.html'),
			chunks: ['index', 'manifest'],
			inject: 'body',
			// minify: HtmlMinifier.minify,
			meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
			// favicon: path.resolve(ROOT_PATH, './src/image/logo.ico')
		}),

		extractCss,
		HotModuleReplacementPlugin,  // 开启全局的模块热替换
		new UglifyjsPlugin({
			sourceMap: true
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
	index: './src/js/index.js'
};
config.entry = entry;

module.exports = config;
