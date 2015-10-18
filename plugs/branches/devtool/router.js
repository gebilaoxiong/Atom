/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-05 20:07:28
 * @description   路由器（这里将路由器从application中分离出来）
 */
define(function(require, exports, module) {
  var Router = require('infrastructure/route/Router'),

    rules = [],

    router;


  /**
   * 默认路径
   */
  rules.push({
    name: 'root',
    //路径规则
    url: '{root}',
    //默认值
    defaults: {
      module: 'task',
      partial: 'index'
    },
    //约束
    constraints: {
      'root': '!\/'
    }
  });


  /**
   * 视图
   */
  rules.push({
    name: 'view',
    //路径规则
    url: '!/{module}/{.partial}',
    //默认值
    defaults: {
      partial: 'index'
    }
  });


  /**
   * 编辑视图
   */
  rules.push({
    name: 'editRoute',
    //路径规则
    url: '!/{module}/edit/{id}',
    //默认值
    defaults: {
      partial: 'edit'
    }
  });


  router = module.exports = new Router({

    routes: rules

  });

})
