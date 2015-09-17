/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 14:48:45
 * @description   工具(扩展全局工具文件)
 */
define(function(require, exports, module) {
  var ret;


  ret = module.exports = require('utils/lang');


  //将VUE的工具函数复制到这里
  ret.each(Vue.util, function(util, name) {

    if (name in exports) {
      return;
    }

    ret[name] = util;
  });

})