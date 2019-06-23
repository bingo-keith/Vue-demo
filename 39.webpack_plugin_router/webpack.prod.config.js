const webpack = require('webpack')

const HtmlwebpackPlugin = require('html-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const merge = require('webpack-merge')

const webpackBaseConfig = require('./webpack.config.js')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 清空基本配置的插件列表
webpackBaseConfig.plugins = []

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: './dist',
        // 将入口文件重命名为带有20位hash值的唯一文件
        filename: '[name].[hash].js'
    },
    mode: 'development',
    plugins: [
        new ExtractTextPlugin({
            // 提取css，并重命名为带有20位hash值的唯一文件
            filename: '[name].[hash].css',
            allChunks: true
        }),
        // 定义当前node环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // webpack4不支持这种写法了
        // 压缩js
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warning: false
        //     }
        // }),
        // 提取模版，并保存入口html文件
        new HtmlwebpackPlugin({
            // 输出目录
            filename: '../index_prod.html',
            // 读取模版
            template: './index.ejs',
            inject: false
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            })
        ]
    }
})