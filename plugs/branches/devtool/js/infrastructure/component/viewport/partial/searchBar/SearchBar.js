/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 14:32:14
 * @description   顶部搜索面板
 */
define(function(require, exports, module) {

  var SearchBar,

    BaseComponent = require('infrastructure/component/BaseComponent'),

    template = require('infrastructure/component/viewport/partial/searchBar/template'),

    util = require('infrastructure/util'),

    doc = document;


  SearchBar = module.exports = BaseComponent.extend({

    name: 'SearchBar',

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

        //处于模拟状态 不做任何处理
        if (me.mimicing) {
          return;
        }

        if (!me.mimicBlurTimer) {
          me.mimicBlurTimer = util.delay(me.mimicBlur, 10, me);
        }

        //绑定文档的mousedown事件
        util.on(doc, 'mousedown', me.mimicBlurTimer);

        me.mimicing = true;
        me.$dispatch('searchbar:onfocus');
      },

      /**
       * 模拟失去焦点事件
       * @param  {Event}              e             事件对象
       */
      mimicBlur: function(e) {
        var me = this,
          wrapEl = me.getWrapEl();

        if (!me._isDestroyed && !wrapEl.contains(e.target) && me.validateBlur(e)) {
          me.triggerBlur();
        }
      },

      /**
       * 触发失去焦点事件
       */
      triggerBlur: function(slient) {
        var me = this;

        me.mimicing = false;

        //绑定文档的mousedown事件
        util.off(doc, 'mousedown', me.mimicBlurTimer);

        if (slient != true) {
          me.$dispatch('searchbar:onblur');
        }
      },

      /**
       * 获取外壳元素
       */
      getWrapEl: function() {
        var me = this,
          wrap = me.$parent && me.$parent.$el;

        return wrap || me.$el;
      },

      /**
       * 验证是否失去焦点
       */
      validateBlur: function() {
        return true;
      }
    },

    /**
     * 销毁前
     */
    beforeDestroy: function() {
      var me = this;

      //解除模拟
      if (me.mimicing) {
        util.off(doc, 'mousedown', me.mimicBlurTimer);
        delete me.mimicBlurTimer;
      }
    }
  });

})