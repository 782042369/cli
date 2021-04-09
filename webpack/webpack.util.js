/*
 * @Author: 杨宏旋
 * @Date: 2021-04-09 10:01:49
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-04-09 13:39:26
 * @Description:
 */
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function setEntry() {
  const files = glob.sync('./src/pages/**/index.js')
  const entry = {}
  files.forEach((file) => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.js$/)
    if (ret) {
      entry[ret[1]] = {
        import: file,
      }
    }
  })
  return entry
}
function getTemplate(name) {
  const files = glob.sync(`./src/pages/${name}/index.html`)
  if (files.length > 0) {
    return files[0]
  }
  return './src/pages/template.html'
}
function setHtmlPlugin() {
  const files = glob.sync('./src/pages/**/index.js')
  const options = []
  files.forEach((file) => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.js$/)
    if (ret) {
      const name = ret[1]
      options.push(
        new HtmlWebpackPlugin({
          filename: `${name}.html`,
          template: getTemplate(name),
          chunks: [name],
        })
      )
    }
  })
  return options
}

module.exports = {
  setEntry,
  setHtmlPlugin,
}
