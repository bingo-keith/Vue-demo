const path = require('path')
const ExtracTextPlugin = require('extract-text-webpack-plugin')

const config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
            // 遇到require或import导入.css的文件，先通过css-loader转换，再通过style-loader转换
            {
                test: /\.css$/,
                use: ExtracTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        // 重命名提取后的css文件
        new ExtracTextPlugin("main.css")
    ]
}

module.exports = config;