/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-11 12:45:10
 * @description   项目面板默认视图
 */
define(function(require, epxorts, module) {
  var View = require('common/component/View'),

    IndexView;

  IndexView = module.exports = View.extend({
    //标题
    title: '项目配置',

    //主题
    theme: 'yellow'
  });
});
