/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 14:32:14
 * @description   顶部搜索面板
 */
define(function(require, exports, module) {

  var SearchBar,

    BaseComponent = require('infrastructure/component/BaseComponent'),

    template = require('infrastructure/component/viewport/partial/searchBar/template');


  SearchBar = module.exports = BaseComponent.extend({

    /*继承父类作用域*/
    inherit: true,

    /*模板*/
    template: template,

    /*属性*/
    attrs: {

      /*是否处于模拟状态*/
      mimicing: false
      
    },

    /*实例方法*/
    methods: {
      /**
       * 获取焦点事件处理函数
       */
      onFocus: function() {
        var me = this;

        if (me.mimicing) {
          return;
        }

        me.mimicing = true;
        me.$dispatch('searchbar:onfocus');
      },

      /**
       * 失去焦点事件处理函数
       */
      onBlur: function(e) {
        var me = this;

        if (me.validateBlur(e)) {
          return;
        }

        me.$dispatch('searchbar:onblur');
      },

      /**
       * 验证是否失去焦点
       * @param  {Event}            e           事件元素
       */
      validateBlur: function(e) {
        console.log(e)
      }
    }
  });

})