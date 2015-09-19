/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-19 11:02:36
 * @version  VM模式
 */
define(function(require, exports, module) {
  var BaseMode,

    util = require('infrastructure/util'),

    Abstract = require('utils/Abstract');

  BaseMode = module.exports = Abstract.extend('BaseMode', {


    state: {},

    /**
     * viewModel
     * @type {Object}
     */
    vm: undefined,

    /**
     * vm之前的状态值
     * @type {[type]}
     */
    memento: undefined,

    init: function(config) {
      var me = this;

      util.extend(me, config);
    },

    /**
     * 将状态应用到VM上
     */
    applyState: function() {
      var me = this,
        state = me.state,
        vm = me.vm,
        memento, key, value;

      //缓存
      me.memento = memento = {};

      for (key in state) {

        value = vm.$get(key);

        if (memento[key] === value) {
          continue;
        }

        //记录原始值
        memento[key] = value;
        //应用状态值
        vm.$set(key, state[key]);
      }
    },

    /**
     * 恢复VM之前的状态
     */
    regain: function() {
      var me = this,
        memento = me.memento,
        vm = me.vm,
        key;

      //没有缓存之前的状态
      if (!memento) {
        return;
      }

      //恢复之
      for (key in memento) {
        vm.$set(key, memento[key]);
      }
    }

  });
})