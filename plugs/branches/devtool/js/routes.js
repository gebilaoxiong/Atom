/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-01 21:40:28
 * @description   路由规则
 */
define(function(require, exports, module) {

  var routeRules = module.exports = [];


  /**
   * 默认路径
   */
  routeRules.push({
    name: 'homeRoute',
    //路径规则
    url: '{root}',
    //默认值
    defaults: {
      module: 'Default',
      verb: 'Index'
    },
    //约束
    constraints:{
      'root':'!\/'
    }
  });


  /**
   * 视图
   */
  routeRules.push({
    name: 'viewRoute',
    url: '!/{module}/{.verb}',
    //默认值
    defaults: {
      verb: 'index'
    }
  });


  /**
   * 编辑视图
   */
  routeRules.push({
    name: 'editRoute',
    url: '!/{module}/edit/{id}',
    //默认值
    defaults: {
      verb: 'edit'
    }
  });

})
