/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-01 20:54:02
 * @description   链接指令
 */
define(function(require, exports, module) {

  var util = require('infrastructure/util'),

    router = require('router'), //路由器

    cache = {},

    attr = 'links_uid_' + Date.now(),

    activeCls = 'active',

    uid = 0;

  /**
   * 绑定
   */
  exports.bind = function() {
    var me = this;

    me[attr] = uid++;
  };

  /**
   * 值更新
   */
  exports.update = function(value, orgValue) {
    var me = this,
      uid = me[attr],
      entry, path, linksCache;

    value = formatValue(value);
    orgValue = formatValue(orgValue);


    //移除旧的缓存
    if (orgValue) {
      path = orgValue.path;
      linksCache = cache[path];

      if (linksCache) {
        delete linksCache[uid];

        if (util.isEmptyObject(linksCache)) {
          delete cache[path];
        }
      }
    }

    //添加进缓存
    if (value) {
      path = value.path;
      linksCache = cache[path];

      if (!linksCache) {
        linksCache = cache[path] = {};
      }

      linksCache[uid] = {
        //路径
        path: value.path,
        //激活样式
        activeCls: value.active || activeCls,

        activate: util.noop,

        deactivate: util.noop
      };
    }

  };

  /**
   * 接触绑定
   */
  exports.unbind = function() {

  };

  /**
   * 格式化值
   */
  function formatValue(value) {
    //only path
    if (util.isString(value)) {
      value = {
        path: value
      };
    }

    return value;
  }



  /**
   * 路由器拦截事件
   */
  router.bind('intercept', function(route, routeDate, hash) {

  });


})
