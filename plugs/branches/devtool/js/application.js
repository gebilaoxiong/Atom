/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 13:56:10
 * @description
 */
define(function(require, exports, module) {
  var Application = require('infrastructure/Application'),

    routeRules = require('routeRules'),

    resources = require('resources'),

    sprit = '/',

    empty = '',

    projectDir = 'project',

    app;

  app = module.exports = new Application({

    /**
     * viewport配置
     */
    viewportCfg: {

      el: 'body',

      /*路径映射配置*/
      routeDataMapper: {
        //文件夹路径
        dir: 'project',
        //映射规则
        format: '{module}/{verb}/View'
      }

    },

    /**
     * 路由规则
     */
    routeRules: routeRules,

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
