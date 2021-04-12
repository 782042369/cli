/*
 * @Author: 杨宏旋
 * @Date: 2021-04-09 09:54:07
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-04-12 16:27:42
 * @Description:
 */
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') //压缩css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new TerserPlugin({
      parallel: 4, // 是否并行打包,多线程
    }),
    new BundleAnalyzerPlugin(), // 打包分析
  ],
  optimization: {
    usedExports: true, // 识别无用代码
    minimize: true, // 将无用代码在打包中删除
    concatenateModules: true, // 尽可能将所有模块合并输出到一个函数中
    sideEffects: true,
    splitChunks: {
      // chunks: 'async', //对同步，异步，所有的模块有效
      minSize: 30000, //当模块大于 30kb
      maxSize: 0, //对模块进行二次分割时使用，不推荐使用
      minChunks: 1, //打包生成的 chunk 文件最少有几个 chunk 引用了这个模块
      // maxAsyncRequests: 5, //模块请求 5 次
      // maxInitialRequests: 3, //入口文件同步请求 3 次
      automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: {
        commons: {
          name: 'commons', //提取出来的文件命名
          chunks: 'initial', //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
        },
      },
    },
  },
})
