/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-11 12:45:10
 * @description   项目面板默认视图
 */
 define(function(require, epxorts, module){
   var BaseView = require('infrastructure/component/BaseViewport'),

    IndexView;

    IndexView = module.exports = BaseView.extend({
      //标题
      title:'任务管理',

      //主题
      theme:''
    });
 });
