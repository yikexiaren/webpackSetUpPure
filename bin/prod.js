const path = require('path');
// 合并配置文件 (公共配置文件,当前配置文件)
const { merge } = require('webpack-merge');
// 导入公共文件
const defaultConfig = require('./index');

module.exports = merge(defaultConfig, {
  // 生产模式
  mode: 'production',
  // 不生成 map文件
  devtool: false,
  output: {

    path: path.join(__dirname, '../dist'),
    // 生成的文件带 hash 版本信息
    filename: 'app.[fullhash].js',
  },
});
