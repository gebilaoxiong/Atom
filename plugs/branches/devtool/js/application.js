/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 13:56:10
 * @description
 */
define(function(require, exports, module) {
  var Application = require('infrastructure/Application'),

    viewportConfig = require('viewportConfig'),

    resources = require('resources'),

    router = require('router'), //路由器

    sprit = '/',

    empty = '',

    projectDir = 'project',

    app;

  app = module.exports = new Application({

    /**
     * 路由器
     * 这里采用外部实例化
     */
    router: router,

    /**
     * viewport配置
     */
    viewport: viewportConfig,

    /**
     * 资源文件
     */
    resources: resources,

    /**
     * 路由器拦截事件处理函数
     * @param  {Route}      route           路由
     * @param  {object}     routeData       路由数据
     */
    onRouterIntercept: function(route, routeData) {
      var navigation;

      //console.log(this.translateRouteDataToHash(routeData))
    },

    /**
     * routeData->hash转换
     * @param  {object}     routeData       路由数据
     */
    translateRouteDataToHash: function(routeData) {
      var hash = [
        sprit, routeData.module,
        sprit, routeData.verb
      ];

      return hash.join(empty);
    }
  });


  /*获取导航面板*/
  function getNavigation(app) {
    var viewport = app.viewport;

    if (viewport && viewport.rendered) {
      return viewport.items.get(0);
    }
  }
});
