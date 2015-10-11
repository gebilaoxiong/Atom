/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-01 20:54:02
 * @description   异步组件指令
 *                用于加载组件
 *                继承于component指令
 */
define(function(require, exports, module) {
  var RouteDataMapper = require('infrastructure/route/RouteDataMapper'),

    LoadProxy = require('infrastructure/LoadProxy'),

    componentDirective = Vue.options.directives._component,

    util = require('infrastructure/util'),

    router = require('router'),

    loadListener = {},

    loadEventHandlerHooks = {},

    pathMap = {},

    uid = 0,

    prefix = Vue.config.prefix + 'aync' + Date.now();

  util.extend(exports, componentDirective);

  /**
   * 绑定
   */
  exports.bind = function() {
    var me = this;

    //关注的路由名称
    me.routes = me._checkParam('route')
      .split(',');

    //url映射
    me.mapper = new RouteDataMapper({
      format: me._checkParam('path')
    });

    me._isDynamicLiteral = true;

    //callparent
    componentDirective.bind.apply(me, arguments);

    router.bind('intercept', me, me.onRouteIntercept);
  };

  /**
   * 处理路由器捕获事件
   */
  exports.onRouteIntercept = function(router, routeData, hash) {
    var me = this,
      mapper = me.mapper,
      path, id;

    //不在关注的路由中
    if (me.routes.indexOf(router.name) == -1) {
      return;
    }

    path = mapper.map(routeData);

    //获取UID
    if(path in pathMap){
       id = pathMap[path];
    }else{
      pathMap[path] = id = prefix + (uid++);
    }

    me.checkoutComponent(path);
  };

  /**
   * 切换组件
   */
  exports.checkoutComponent = function(path) {
    var me = this,
      id = pathMap[path];

    //如果组件已存在
    //且不是现有组件
    //直接切换
    if (me.existComponent(id) && me.Component !== me.vm.$options.components[id]) {
      me.setComponent(id);
      return;
    }

    me.loadComponent(path);
  };

  /**
   * 初始化加载器(有待扩展)
   */
  exports.loadComponent = function(path) {
    var me = this;

    //取消之前加载的
    if (me.loader) {
      me.loader.cancel();
    }

    //监听事件
    me.loadListener = util.extend({
      scope: me
    }, loadListener);

    me.loader = new LoadProxy('load', path, me.loadListener);

    me.loader.load(path);
  }

  /**
   * 校验组件是否存在
   */
  exports.existComponent = function(id) {
    var me = this;

    return id in me.vm.$options.components;
  }

  //注册绑定事件
  util.each({
    //页面加载前（mask）
    'beforeload': 'onbeforeload',
    //加载完成(unmask)
    'complete': 'onloadcomplete',
    //加载成功
    'success': 'onloadsuccess',
    //加载失败
    'failure': 'onloadfailure',
    //取消加载
    'cancel': 'oncancelload'
  }, function(handler, event) {
    loadListener[event] = function() {
      var me = this,
        vm = me.vm,
        processHandler;

      //执行钩子
      if (event in loadEventHandlerHooks) {
        loadEventHandlerHooks[event].apply(me, arguments);
      }

      //如果标签上不存在回调方法名称
      if (!(processHandler = me._checkParam(handler))) {
        return;
      }

      vm[processHandler].call(vm, arguments);
    };
  });

  /**
   * 加载完毕钩子
   */
  loadEventHandlerHooks['success'] = function(loader, operation ,componentType, url) {
    var me = this,
      id = pathMap[url];

    me.vm.$options.components[id] = componentType;
    me.setComponent(id);
  }

})
