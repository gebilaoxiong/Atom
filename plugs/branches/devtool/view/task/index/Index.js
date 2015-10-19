/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-11 12:45:10
 * @description   任务面板默认视图
 */
define(function(require, epxorts, module) {
  var View = require('common/component/View'),

    ListPanel = require('view/task/component/list/Panel'),

    template = '<list></list>',

    IndexView;

  IndexView = module.exports = View.extend({
    //标题
    title: '任务管理',

    //主题
    theme: '',

    template: template,

    components: {
      'list': ListPanel
    }
  });
});
