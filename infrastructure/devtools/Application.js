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

    /*默认页面*/
    defaultPage:'',

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

      /*路由器开始工作*/
      me.router.start();

      /*默认页面*/
      if(me.defaultPage){
        me.router.navigate(me.defaultPage);
      }
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
    registerDirective: registerDirectiveFactory('directive'),

    /**
     * 注册VUE元素指令
     */
    registerElementDirective: registerDirectiveFactory('elementDirective'),

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
    }
  });

  /**
   * 指令注册工厂
   * @param  {String}             directiveType          指令类型
   */
  function registerDirectiveFactory(directiveType) {
    //调用方法
    var method = 'register' + util.cap(directiveType);

    return function(name, directive) {
      var me = this;

      //传入的是hash对象
      if (util.isObject(name)) {
        util.each(name, function(directive, directiveName) {
          me[method](directiveName, directive);
        })
        return;
      }

      if (!directive) {
        return;
      }

      Vue[directiveType](name, directive);
    };
  }

})
