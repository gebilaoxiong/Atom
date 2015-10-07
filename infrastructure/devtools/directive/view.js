/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-01 20:54:02
 * @description   异步组件指令
 *                用于加载组件
 *                继承于component指令
 */
define(function(require, exports, module) {
  var componentDirective = Vue.options.directives._component,

    util = require('infrastructure/util');

  util.extend(exports, componentDirective);
})
