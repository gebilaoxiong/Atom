/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-02 14:42:28
 * @description   公共资源文件
 */
define(function(require, exports, module) {
  module.exports = {
    /*指令*/
    'directive': {
      'link': require('infrastructure/directive/link')
    },

    /*元素指令*/
    'elementDirective':{
      'view': require('infrastructure/directive/view')
    },

    /*过滤器*/
    'filter':{
      'relativetime':require('infrastructure/filter/relativetime')
    }
  }
})
