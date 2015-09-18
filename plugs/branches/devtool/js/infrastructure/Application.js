/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 12:38:50
 * @description
 */
define(function(require, exports, module) {

  var Application,

    util = require('infrastructure/util'),

    Router = require('infrastructure/route/Router'),

    Observable = require('utils/Observable'),

    Viewport = require('infrastructure/component/viewport/Viewport');

  Application = module.exports = Observable.extend('Application', {

    /*viewport初始化对象*/
    viewportCfg: undefined,

    /*路由器初始化对象*/
    routerConfig: undefined,

    /*路由器*/
    router: undefined,

    /**
     * 重写初始化
     * @param  {Object}         config            初始化配置
     */
    init: function(config) {
      var me = this;

      util.extend(me, config);

      //初始化路由器
      me.initRouter();

      //注册路由
      me.regiterRoutes(me.router);

      //注册路由器拦截事件
      me.router.bind('intercept', me, me.onRouterIntercept);

      //初始化应用程序容器面板
      me.initAppViewport(me.viewportCfg);

      me.onApplicationStart();

      /*路由器开始工作*/
      me.router.start();
    },

    /*初始化路由器*/
    initRouter: function() {
      var me = this,
        router = me.router;

      if (util.isPlainObject(router)) { //配置对象
        me.routerConfig = router;
        me.router = null;
      }

      if (router == undefined) {
        router = me.defaultRouterType;
      }

      if (util.isFunction(router)) { //构造函数
        me.router = new router(me.routerConfig);
      }
    },

    regiterRoutes: util.noop,

    /*初始化应用程序容器*/
    initAppViewport: function(viewportCfg) {
      var me = this;

      if (!me.viewport) {
        me.viewport = new Viewport(viewportCfg);
      }
    },

    onApplicationStart: util.noop,

    /**
     * 路由器拦截事件处理函数
     * @param  {event}      e               事件对象
     * @param  {Route}      route           路由
     * @param  {object}     routeData       路由数据
     */
    onRouterIntercept: util.noop,

    /*导航*/
    navigate: function(routeData, options) {
      var hash;

      hash = this.translateRouteDataToHash(routeData);

      this.router.navigate(hash, options);
    },

    translateRouteDataToHash: util.noop
  });


  Application.prototype.defaultRouterType = Router;
})