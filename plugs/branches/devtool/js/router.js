/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-05 20:07:28
 * @description   路由器（这里将路由器从application中分离出来）
 */
define(function(require, exports, module) {
  var Router = require('infrastructure/route/Router'),

    routes = require('routes'),

    router;

  router = module.exports = new Router({

    routes: routes

  });

})
