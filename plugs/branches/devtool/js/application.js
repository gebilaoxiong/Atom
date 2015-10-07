/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 13:56:10
 * @description
 */
define(function(require, exports, module) {
  var Application = require('infrastructure/Application'),

    viewport = require('viewport'),

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
    viewport: viewport,

    /**
     * 资源文件
     */
    resources: resources,

    /**
     * 应用程序开始句柄
     */
    onApplicationStart:function(){
      var me = this,
        router = me.router;

      router.navigate('!/')
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
