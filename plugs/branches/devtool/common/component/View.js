/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-18 12:10:10
 * @description   项目面板默认视图
 */
define(function(require, epxorts, module) {
  var BaseView = require('infrastructure/component/BaseView'),

    IndexView;

  IndexView = module.exports = BaseView.extend({
    //标题
    title: '',

    //主题
    theme: ''
  });
});
