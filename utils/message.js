/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-08 23:06:11
 * @version  消息传递类
 */
define(function(require, exports, module) {

  var Message,

    Abstract = require('utils/abstract');


  Message = module.exports = Abstract.extend('Message', {

    /**
     * 消息类型
     * @type {String}
     */
    type: '',

    /**
     * @private 连接
     */
    connection: undefined,

    /**
     * 发送消息
     */
    send: function() {

    },

    /**
     * 监听消息
     */
    listen: function() {

    }
  });

})