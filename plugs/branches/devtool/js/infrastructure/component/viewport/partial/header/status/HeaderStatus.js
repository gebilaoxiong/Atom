/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-21 11:03:26
 * @description   header状态抽象
 */
define(function(require, exports, module) {
  var HeaderStatus,

    BaseStatus = require('infrastructure/component/status/BaseStatus'),

    util = require('infrastructure/util');

  HeaderStatus = module.exports = BaseStatus.extend('HeaderStatus', {

    /**
     * Icon图标点击事件处理函数
     */
    onIconClick: util.noop

  });
})