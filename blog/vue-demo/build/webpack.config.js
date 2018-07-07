console.log(__dirname);

console.log("webpack start！-------------------------------------------------");

const webpack = require('webpack');
const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new htmlWebpackPlugin({
    filename: 'html/index.html',
    template: './src/template/template.html',
    inject: 'body',
    title: 'Study Demo',
    chunks: '',
    hash: true
});

console.log("aaa");

// const VueLoaderPlugin = require('vue-loader/lib/plugin');  // vue-loader v14,v15

const config = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].js',
        // process.env.NODE_ENV
        // 1. 设置系统环境变量 NODE_ENV 为 production
        // 2. 通过 process.env.NODE_ENV 获取 NODE_ENV 的值，做判断
        // 3. 判断 生产环境 还是 开发环境
        path: process.env.NODE_ENV === 'production' ? __dirname + '/dist' : __dirname + '/dist',
        publicPath: '../'
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
        htmlPlugin
        // new VueLoaderPlugin()  // vue-loader v14,v15
    ],
    watch: true
    ,
    devServer: {
        // compress: true,
        // contentBase: path.join(__dirname, 'dist'),
        // watchContentBase: true,
        inline: true,  // 实时更新
        port: 3000,
        hot: false,
        // hotOnly: true,
        host: '127.0.0.1'
    }
};

console.log("end");

module.exports = config;