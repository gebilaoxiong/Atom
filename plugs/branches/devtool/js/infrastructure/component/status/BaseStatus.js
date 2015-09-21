/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-19 11:02:36
 * @version  VM状态
 */
define(function(require, exports, module) {
  var BaseStatus,

    util = require('infrastructure/util'),

    Abstract = require('utils/Abstract');

  BaseStatus = module.exports = Abstract.extend('BaseStatus', {

    /**
     * 需要覆盖的状态
     * @type {Object}
     */
    state: {},

    /**
     * viewModel
     * @type {Object}
     */
    vm: undefined,

    /**
     * 重写初始化
     */
    init: function(config) {
      var me = this;

      util.extend(me, config);
    },

    /**
     * 将当前状态下的成员覆盖到VM上
     */
    apply: function() {
      var me = this;

      me.beforeApply();
      me.applyState();
    },

    /**
     * 应用前句柄
     */
    beforeApply: util.noop,

    /**
     * 将状态覆盖到VM上
     */
    applyState: buildApply('state', true),

    /**
     * 恢复成员
     */
    recover: function() {
      var me = this;

      me.beforeRecorver();
      me.recoverState();
    },

    /**
     * 恢复前句柄
     */
    beforeRecorver: util.noop,

    /**
     * 恢复VM之前的状态
     */
    recoverState: buildRecover('state', true)

  });

  /**
   * 覆盖方法工厂
   * @param  {String}           type          成员类型名称
   * @param  {Boolean}          useAcc        是否使用访问器
   */
  function buildApply(type, useAcc) {
    return function() {
      var me = this,
        cover = me[type],
        vm = me.vm,
        cache, key, value;

      //缓存
      me['_' + type] = cache = {};

      for (key in cover) {

        value = useAcc ? vm.$get(key) : vm[key];

        if (cache[key] === value) {
          continue;
        }

        //记录原始值
        cache[key] = value;

        //覆盖状态值
        if (useAcc) {
          vm.$set(key, cover[key]);
        } else {
          vm[key] = cover[key]
        }
      }

    };
  }

  /**
   * 恢复方法工厂
   * @param  {String}           type          成员类型名称
   * @param  {Boolean}          useAcc        是否使用访问器
   */
  function buildRecover(type, useAcc) {
    return function() {
      var me = this,
        cache = me['_' + type],
        vm = me.vm,
        key;

      //没有缓存之前的状态
      if (!cache) {
        return;
      }

      //恢复之
      for (key in cache) {

        if (useAcc) {
          vm.$set(key, cache[key]);
        } else {
          vm[key] = cache[key]
        }

      }
    };
  }

})