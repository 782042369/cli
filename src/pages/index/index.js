/*
 * @Author: 杨宏旋
 * @Date: 2021-04-09 09:51:35
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-04-12 16:38:12
 * @Description:
 */

// css
import '../../css/reset.scss'
import './index.scss'

import $ from 'jquery'
$(function () {
  let HTML = ''
  Object.keys(Array.apply(null, { length: 100 })).map(
    (item) =>
      (HTML += `<li><a href="javascipt:;"><span>${+item}</span></a></li>`)
  )
  $('#menu').html(HTML)
})
