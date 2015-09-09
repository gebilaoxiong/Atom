/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-09 10:57:38
 * @description   消息传递者 封装chrome消息接收机制逻辑
 *
 * 消息结构
 * {
 *   name:'login',
 *   data:{}
 * }
 */
define(function(require, exports, module) {
  var Receiver,

    Observable = require('utils/observable');

  Receiver = module.exports = Observable.extend('Receiver', {

    /**
     * 线程名称
     * @type {String}
     */
    process: '',

    /**
     * 是否开启自动监听
     * @type {Boolean}
     */
    autoListen: true,

    isListened: false,

    /**
     * 重写初始化
     */
    init: function(config) {
      var me = this;

      me.configuration.apply(me, arguments);

      //调用基类初始化方法
      me.callParent(arguments);

      if (me.autoListen) {
        me.listen();
      }
    },

    configuration: function(config) {
      var me = this;

      _.extend(me, config);

      me.onConnectHandler = onConnectHandler.bind(me);
      me.onMessageHandler = onMessageHandler.bind(me);
      me.onDisconnectHandler = onDisconnectHandler.bind(me);
    },

    /**
     * 开始监听
     */
    listen: function() {
      var me = this;

      if (me.isListened ||
        //监听事件被取消
        me.emit('listen') === false
      ) {
        return;
      }
      me.isListened = true;

      chrome.runtime.onConnect.addListener(me.onConnectHandler);
    },

    /**
     * 取消监听
     */
    off: function() {
      var me = this,
        port = me.port;

      if (!port || me.isListened || me.emit('listen') === false) {
        return;
      }

      me.isListened = false;

      me.port.onMessage.removeListener(me.onMessageHandler);
      chrome.runtime.onConnect.removeListener(me.onConnectHandler);
    },

    /**
     * 重写销毁
     */
    destroy: function() {
      var me = this;

      me.off();

      delete me.onConnectHandler;
      delete me.onMessageHandler;
      delete me.onDisconnectHandler;
      delete me.port;
    }
  });


  /**
   * 连接事件处理函数
   */
  function onConnectHandler(port) {
    var me = this,
      processName = me.process;

    //线程名称不一致
    //不订阅消息
    if (port.name !== processName) {
      return;
    }

    me.port = port;

    //绑定消息处理函数
    port.onMessage.addListener(me.onMessageHandler);
    //失去连接取消订阅
    port.onDisconnect.addListener(me.onDisconnectHandler);
  }

  /**
   * 消息处理函数
   */
  function onMessageHandler(message, sender, sendResponse) {
    var me = this;

    if (!message.name) {
      return;
    }

    me.emit(message.name, message.data);
  }

  /**
   * 连接断开处理函数
   */
  function onDisconnectHandler() {
    var port = this.port;

    if (!port) {
      return;
    }

    port.onMessage.removeListener(dispatchMessage);
  }

})