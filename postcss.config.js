/*
 * @Author: 杨宏旋
 * @Date: 2021-04-09 14:07:44
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-04-09 14:23:15
 * @Description:
 */
module.exports = {
  sourceMap: false,
  parser: 'postcss-scss',
  plugins: {
    // precss: {},
    'postcss-preset-env': {},
    autoprefixer: { browsers: 'last 5 version' },
  },
}
