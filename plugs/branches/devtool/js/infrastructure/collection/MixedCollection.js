/**
 *
 * @authors 熊洋 (xywindows@gmail.com)
 * @date    2014-10-22 21:58:54
 * @description 带有缓存键的列表
 */
define(function(require, exports, module) {
  var MixedCollection,

    util = require('infrastructure/util'),

    List = require('infrastructure/collection/List');

  MixedCollection = module.exports = List.extend('MixedCollection', {

    /**
     * 重写初始化
     * @param  {Object}             config          配置对象
     * @param  {Function|String}    key             键值
     */
    init: function(config, key) {
      var me = this,
        type = util.type(config);

      //整理参数
      if (type === 'function' || type === 'string') {
        key = config;
        config = undefined;
      }

      //键值萃取器
      if (!me.getKey) {
        me.getKey = typeof key === 'function' ? key : util.extractor(key);
      }

      //缓存
      me.cache = {};
      me.callParent(arguments);
    },

    onAdd: function(item) {
      var me = this,
        key;

      key = me.getKey(item);
      me.cache[key] = item;
    },

    onRemove: function(item) {
      var me = this,
        key;

      key = me.getKey(item);
      delete me.cache[key];
    },

    getBy: function(key) {
      return this.cache[key];
    },

    contains: function(item) {
      var me = this;
      return util.isString(item) ? (item in me.cache) : me.callParent(arguments);
    },

    destroy: function() {
      var me = this;

      delete me.cache;
      me.callParent(arguments);
    }
  });
});