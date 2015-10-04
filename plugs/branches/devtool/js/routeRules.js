/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-01 21:40:28
 * @description   路由规则
 */
define(function(require, exports, module) {

  var routeRules = module.exports = [];


  /*默认路径*/
  routeRules.push({
    name: 'homeRoute',
    path: '',
    options: {
      defaults: {
        module: 'Default',
        verb: 'Index'
      }
    }
  });

  /*视图*/
  routeRules.push({
    name: 'viewRoute',
    path: '/{module}/{.verb}',
    options: {
      //默认值
      defaults: {
        verb: 'index'
      }
    }
  });

  /*编辑视图*/
  routeRules.push({
    name: 'editRoute',
    path: '/{module}/edit/{id}',
    options: {
      //默认值
      defaults: {
        verb: 'edit'
      }
    }
  });

})
