/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-01 20:54:02
 * @description   链接指令
 */
define(function(require, exports, module) {

  var util = require('infrastructure/util'),

    cache = {},

    uid = 0;

  /**
   * 绑定
   */
  exports.bind = function() {
    var me = this,
      entry = {};

    me.linkUid = uid++;

    entry.active = onLinkActive;

    entry.deactive = onLinkDeactive;

    cache[me.linkUid] = entry;
  };

  /**
   * 值更新
   */
  exports.update = function(value) {
    console.log(value)
  };

  /**
   * 接触绑定
   */
  exports.unbind = function() {

  };


  function onLinkActive(el) {

  }

  function onLinkDeactive(el) {

  }

})
