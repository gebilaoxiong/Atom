/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 16:46:02
 * @description   抽象组件基类
 */
define(function(require, exports, module) {
  var AbstractComponent;

  AbstractComponent = module.exports = Vue.extend({});

  /**
   * 重写初始化
   */
  AbstractComponent.prototype._init = function(config) {
    var me = this;

    //保存初始化配置
    me.$initConfig = config;

    //调用父类初始化方法
    Vue.prototype._init.apply(me, arguments);
  };
})