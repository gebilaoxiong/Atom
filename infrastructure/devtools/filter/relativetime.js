/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-20 00:47:33
 * @description   过滤器：相对时间
 */
define(function(require, exports, module) {
  require('lib/moment/locale/zh-cn');//中文

  module.exports = function(value){
    return moment(value).fromNow();
  }
})
