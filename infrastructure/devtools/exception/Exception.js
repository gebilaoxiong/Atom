/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 17:25:33
 * @description   异常基类
 */
define(function(require, exports, module) {

  /*错误类封装*/
  var Exception,

    util = require('infrastructure/util'),

    Abstract = require('utils/Abstract');

  Exception = module.exports = Abstract.extend('Exception', {

    lang: {},

    type: 'Exception',

    init: function(message) {
      var me = this;

      me.type = me.type;
      me.message = me.lang[message] ? me.lang[message] : message;
    },

    getName: function() {
      return this.name;
    },

    getMessage: function() {
      return this.message;
    },

    toJson: function() {
      return JSON.stringify(this);
    }
  });
  
})