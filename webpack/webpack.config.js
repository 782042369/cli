/*
 * @Author: 杨宏旋
 * @Date: 2021-04-09 09:48:44
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-04-12 16:38:51
 * @Description:
 */

const path = require('path')
const { setEntry, setHtmlPlugin } = require('./webpack.util')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: setEntry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // 需要兼容到以下浏览器的什么版本
                  targets: {
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1',
                  },
                  // 按需加载
                  useBuiltIns: 'usage',
                  // 指定core-js版本 看好了这个地方如果和你安装的包的版本不一样会报错
                  corejs: '3.8.3',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [[require('postcss-preset-env')()]],
              },
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            // 用 url-loader 处理图片
            loader: 'url-loader', // url-loader 依赖于  file-loader 要使用url-loader必须安装file-loader
            options: {
              name: '[name].[contenthash:8].[ext]', // 文件名.hash.文件扩展名 默认格式为[hash].[ext]，没有文件名
              limit: 1024 * 8, // 将小于8KB的图片转换成base64的格式
              outputPath: 'images', // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
              publicPath: 'images', // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader'],
      },
      {
        test: /\.(woff|woff2|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'svg-url-loader',
      },
    ],
  },
  plugins: [...setHtmlPlugin(), new MiniCssExtractPlugin()],
  externals: {
    $: 'jquery',
    jQuery: 'jquery',
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
}
