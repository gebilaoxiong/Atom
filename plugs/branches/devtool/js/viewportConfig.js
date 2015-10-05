/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-05 23:30:28
 * @description   视窗
 */
define(function(require, exports, module) {

  var Viewport = require('common/component/viewport/Viewport'),

    config

  config = {

    el: 'body',

    xtype: Viewport,

    /*路径映射配置*/
    routeDataMapper: {
      //文件夹路径
      dir: 'project',
      //映射规则
      format: '{module}/{verb}/View'
    }

  };


  module.exports = config
})
