const path = require('path')
// 合并配置文件 (公共配置文件,当前配置文件)
const { merge } = require('webpack-merge')
// 导入公共文件
const defaultConfig = require('./index.js')
module.exports =  merge(defaultConfig,{
    // 开发模式
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 7100,
        compress: true,
        hot: true,
        open: true,
         proxy: {
           '/api': 'http://localhost:3000',
         },
    }
})