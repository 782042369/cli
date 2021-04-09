/*
 * @Author: 杨宏旋
 * @Date: 2021-04-09 09:54:00
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-04-09 13:35:17
 * @Description:
 */
const { merge } = require('webpack-merge')
const path = require('path')
const base = require('./webpack.config.js')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    open: true,
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    hot: true, // 开启热更新,
    port: 8777,
    compress: true, // gz
  },
})
