/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 17:13:16
 * @description 加载器代理，
 *              封装seajs的加载行为
 *              实现取消加载、重加载
 *              触发相应事件，让订阅者处理
 */
define(function(require, exports, module) {

  var LoadProxy,

    Observable = require('utils/Observable'),

    Exception = require('infrastructure/exception/Exception'),

    ViewLoadException,

    /*事件*/
    events = {
      beforeload: 'beforeload',
      cancel: 'cancel',
      complete: 'complete',
      success: 'success',
      failure: 'failure'
    },

    /*状态*/
    status = {
      success: 'success',
      failure: 'failure'
    };


  LoadProxy = module.exports = Observable.extend('LoadProxy', {
    /**
     * 初始化
     * @param  {String} operation       操作类型(openpage,openwindow,redirect)
     * @param  {string} url             请求的URL
     * @param  {Object} listener        需要绑定的事件
     * @param  {Object} data            数据
     */
    init: function(operation, url, listener, data) {
      var me = this,
        showExceptionTimes = 0; //提示错误次数

      me.listener = listener;

      me.callParent(arguments);

      /**
       * 载入view
       */
      me.load = function() {
        if (!me) {
          return;
        }

        //重置错误提示次数
        showExceptionTimes = 0;

        if (me.emit(events.beforeload, operation, me, url, data) !== false) {
          //加载view
          seajs.use([url], me.success);
        }
      };

      /**
       * 成功返回的回调
       * @param  {Type} frameType 返回加载的view
       */
      me.success = function(frameType) {
        if (!me) { //析构后不执行任何动作
          return;
        }

        //seajs居然没有异常处理回调
        if (!frameType) {
          me.failure();
          return;
        }

        //触发加载完成事件
        me.emit(events.complete, status.success, me, operation, url, data);
        //触发加载成功事件
        me.emit(events.success, me, operation, frameType, url, data);

        //析构
        me.cancel(true);
      };

      /**
       * 失败的回调
       * @param  {Error} e 错误
       */
      me.failure = function() {
        var $error, i, path;


        if (!me || showExceptionTimes) { //析构后不执行任何动作
          return;
        }

        //累计次数 防止重复提示
        showExceptionTimes++;

        $error = new ViewLoadException('failure');

        //触发加载完成事件
        me.emit(events.complete, status.failure, me, operation, url, data);
        //触发加载失败事件
        me.emit(events.failure, me, $error,operation, url, data);
        me.cancel(true);
      };

      /**
       * 取消加载
       */
      me.cancel = function(silent) {
        //如果已经析构 或者事件被取消
        if (!me || (!silent && me.emit(events.cancel, me, operation, url, data) === false)) {
          return;
        }

        me.unbind(); //解除事件绑定
        operation = url = data = me = undefined;
      };
    }
  });

  /*错误类*/
  ViewLoadException = Exception.extend('ViewLoadException', {

    lang: {
      noReturnType: '没有返回类型！',
      failure: '当前页面加载失败！'
    },

    init: function(msg) {
      var me = this;

      me.callParent('init', [msg]);
    }
  });
});
