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
    name: 'root',
    //路径规则
    url: '{root}',
    //默认值
    defaults: {
      module: 'task',
      partial: 'index'
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
  routeRules.push({
    name: 'editRoute',
    //路径规则
    url: '!/{module}/edit/{id}',
    //默认值
    defaults: {
      partial: 'edit'
    }
  });

})
