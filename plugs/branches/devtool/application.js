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

    router = require('router'), //路由器,

    app;

  app = module.exports = new Application({

    /**
     * 默认页面
     * @type {String}
     */
    defaultPage: '!/',

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
    resources: resources
  });

});
