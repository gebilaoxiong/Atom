/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 13:56:10
 * @description
 */
define(function(require, exports, module) {
  var Application = require('infrastructure/Application'),

    sprit = '/',

    empty = '',

    projectDir = 'project',

    app;


  app = module.exports = new Application({

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
     * 注册路由
     */
    regiterRoutes: function(router) {
      /*默认路径*/
      router.register('homeRoute', empty, {
        defaults: {
          module: 'Default',
          verb: 'Index'
        }
      });

      //视图
      router.register('viewRoute', '/{module}/{.verb}', {
        //默认值
        defaults: {
          verb: 'index'
        }
      });

      //编辑
      router.register('editRoute', '/{module}/edit/{id}', {
        //默认值
        defaults: {
          verb: 'edit'
        }
      });
    },

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