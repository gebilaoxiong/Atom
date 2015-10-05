/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 16:46:02
 * @description   组件基类
 */
define(function(require, exports, module) {
  var BaseComponent,

    util = require('infrastructure/util');

  BaseComponent = module.exports = Vue.extend({

    /*方法*/
    methods: {

      /**
       * 从备忘录中恢复状态
       */
      initState: util.noop,

      /**
       * 记录当前VM状态
       */
      getState: util.noop,

      /**
       * 应用状态至VM
       */
      applyState: util.noop,

      /**
       * 将状态保存至备忘录
       */
      saveState: util.noop
    }

  });

  util.extend(BaseComponent.prototype, {

    /**
     * 重写初始化
     */
    _init: function(config) {
      var me = this

      //保存初始化配置
      me.$initConfig = config || {};

      me.initAttrs();

      //调用父类初始化方法
      Vue.prototype._init.apply(me, arguments);
    },

    /**
     * 初始化属性
     */
    initAttrs: function() {
      var me = this,
        initConfig = me.$initConfig,
        attr, attrValue;;


      if (!me.attrs) {
        return;
      }
      
      for (attr in me.attrs) {
        //传入的值
        propValue = initConfig[attr];

        me[attr] = attrValue == undefined ?
          attrValue :
          me.attrs[attr];
      }

    }

  });

})
