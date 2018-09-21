const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

// const HtmlMinifier = require('html-minifier');  // @TODO: 暂且不用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    title: '',
    path: path.resolve(ROOT_PATH, './dist/'),
    filename: './html/index.html',
    template: path.resolve(ROOT_PATH, './src/html/index.html'),
    // chunks: [],
    inject: 'body',
    // minify: HtmlMinifier.minify,
    meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
	// favicon: path.resolve(ROOT_PATH, './src/image/logo.ico')
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractless = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

const config = {
    entry: {
        index: path.resolve(ROOT_PATH, 'src/js/index.js')
    },
    output: {
        path: path.resolve(ROOT_PATH, './dist/'),
        filename: './js/[name].js'
    },
    module: {
        rules: [
            {
				test: require.resolve('jquery'),
				loader: 'expose-loader?jQuery!expose-loader?$'
			},
            {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					query: {
						plugins: ['transform-runtime'],
						presets: ['es2015', 'stage-0']
					},
				}
			},
            {
				test: /\.less|.css$/,
				exclude: /node_modules/,
				use: extractless.extract({
					fallback: 'style-loader',
					use: [
						{loader: 'css-loader'},
                        {loader: 'px2rem-loader?remUnit=100&remPrecision=8'},
						// {loader: 'px2rem-loader?remUnit=46.875&remPrecision=8'},
						{loader: 'less-loader'},
					]
				})
			},
            {
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'html-loader'
				}
			},
            {
				test: /\.(gif)$/i,
				exclude: /node_modules/,
				loaders: [
					{
						loader: 'url-loader',
						query: {
							name: 'images/[name].[ext]',
							// publicPath: './../../../../redev/wechat_for_comp/dist/',
							limit: 8192,
						}
					},
					{
						loader: 'image-webpack-loader',
						query: {
				            progressive: true,
				            optimizationLevel: 5,
				            interlaced: false,
				            gifsicle: {
				            	colors: 64,
				            	optimizationLevel: 3,
				            	interlaced: false,
				            },
				        }
					}
				]
			},
            {
				test: /\.(png|jpe?g|svg)$/,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader',
					options: {
						name: 'images/[name].[ext]',
						// publicPath: './../../../../redev/wechat_for_comp/dist/',
						limit: 8192,
					}
				}
			},
        ]
    },
    plugins: [
        htmlPlugin,
        extractless
    ],
    devServer: {
		contentBase: path.resolve(ROOT_PATH, './dist/'),
		// inline: true,
		// hot: true,
		port: 3000
	},
    watch: true,
};

module.exports = config;
