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

    Observable = require('utils/Observable');

  Application = module.exports = Observable.extend('Application', {

    /*viewport初始化对象*/
    viewport: undefined,

    /*路由器*/
    router: undefined,

    /*路由规则*/
    routeRules: undefined,

    /*资源文件*/
    resources: undefined,

    /**
     * 重写初始化
     * @param  {Object}         config            初始化配置
     */
    init: function(config) {
      var me = this,
        routeRules, resources, viewport;

      util.extend(me, config);

      //初始化路由器
      me.initRouter();

      //注册路由规则
      if (routeRules = me.routeRules) {
        delete me.routeRules;
        me.registerRoute(routeRules);
      }

      //加载资源
      if (resources = me.resources) {
        delete me.resources;
        me.registerResource(resources);
      }

      //初始化viewport
      if (viewport = me.viewport) {
        delete me.viewport;
        //初始化应用程序容器面板
        me.initAppViewport(viewport);
      }

      //注册路由器拦截事件
      me.router.bind('intercept', me, me.onRouterIntercept);

      /*路由器开始工作*/
      me.router.start();

      me.onApplicationStart();
    },

    /*初始化路由器*/
    initRouter: function() {
      var me = this,
        router = me.router;

      if (router == undefined) {
        router = me.defaultRouterType;
      }

      if (util.isFunction(router)) { //构造函数
        me.router = new router(me.routerConfig);
      }
    },

    /**
     * 注册路由规则
     *
     * @exmaple
     *
     * 1. app.register('viewRoute', '/{module}/{.verb}', {
     *      defaults: {
     *      	verb: 'index'
     *      }
     *    })
     *
     * 2. app.register([{
     *      name: 'viewRoute',
     *      path: '/{module}/{.verb}',
     *      options: {
     *        //默认值
     *        defaults: {
     *          verb: 'index'
     *        }
     *      }
     *    }])
     */
    registerRoute: function(name, path, options) {
      var me = this,
        router = me.router;

      //数组
      if (util.isArray(name)) {

        util.each(name, function(rule) {
          me.registerRoute(rule.name, rule.path, rule.options);
        });

        return;
      }

      //注册规则
      router.register(name, path, options);
    },

    /**
     * 注册VUE资源
     */
    registerResource: function(name, resource) {
      var me = this,
        resources;

      if (!util.isObject(name)) {
        resources = {};
        resources[name] = resource;
      } else {
        resources = name;
      }

      util.each(resources, function(resource, name) {
        var method = 'register' + util.cap(name);
        me[method].call(me, resource);
      });

    },

    /**
     * 注册VUE指令
     */
    registerDirective: function(name, directive) {
      var me = this;
      //传入的是hash对象
      if (util.isObject(name)) {

        util.each(name, function(directive, name) {
          me.registerDirective(name, directive);
        })

        return;
      }

      if (!directive) {
        return;
      }

      Vue.directive(name, directive);
    },

    /*初始化应用程序容器*/
    initAppViewport: function(viewport) {
      var me = this,
        viewportType, config;

      if (me.viewport) {
        return;
      }

      //传入的是构造函数
      if (util.isFunction(viewport)) {
        viewportType = viewport;
      }

      //传入的是配置对象
      if (util.isObject(viewport)) {
        viewportType = viewport.xtype;
        config = viewport;
      }

      me.viewport = new viewportType(config);
    },

    onApplicationStart: util.noop,

    /**
     * 路由器拦截事件处理函数
     * @param  {Route}      route           路由
     * @param  {object}     routeData       路由数据
     */
    onRouterIntercept: function(route, routeData) {
      var me = this,
        viewport = me.viewport;

      viewport.navigate(routeData);
    },

    /*导航*/
    navigate: function(routeData, options) {
      var hash;

      hash = this.translateRouteDataToHash(routeData);

      this.router.navigate(hash, options);
    },

    translateRouteDataToHash: util.noop
  });


})
