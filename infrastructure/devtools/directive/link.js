/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-01 20:54:02
 * @description   链接指令(需要重构 提取出Dictionary)
 */
define(function(require, exports, module) {

  var util = require('infrastructure/util'),

    router = require('router'), //路由器

    hashDic = {},

    entryProp = 'link_entry_' + Date.now(),

    activeCls = 'active',

    uid = 0,

    // TODO 非链接Element的click事件绑定的钩子
    updateHooks = {},

    activeHandler,

    deactiveHandler;


  /**
   * 绑定
   */
  exports.bind = function() {
    var me = this;

    me[entryProp] = {
      uid: uid++,
      elem: me.el,
      vm: me.vm
    };
  };


  /**
   * 值更新
   */
  exports.update = function(value, orgValue) {
    var me = this,
      entry = me[entryProp],
      uid = entry.uid,
      nodeName, orgPath;

    //hash
    if (util.isString(value)) {
      value = {
        hash: value
      };
    }

    //从缓存中移除旧值
    if (entry.hash != undefined) {
      removeFromDictionary(entry.hash, uid);
    }

    //剥离旧值
    if (orgValue && orgValue.hash) {
      orgPath = orgValue.hash;
      util.each(orgValue, function(_, key) {
        delete entry[key];
      });
    }

    //赋予新值
    util.extend(entry, value);

    //执行钩子
    nodeName = entry.elem.nodeName.toLowerCase();
    if (nodeName in updateHooks) {
      updateHooks[nodeName].call(me, entry);
    }

    if (orgPath == undefined || orgPath !== entry.hash) {
      putIntoDictionary(entry);
    }

  };


  /**
   * 接触绑定
   */
  exports.unbind = function() {
    var me = this,
      entry = me[entryProp],
      uid = entry.uid,
      hash = entry.hash;

    if (hash) {
      removeFromDictionary(hash, uid);
    }

    util.each(entry, function(_, key) {
      delete entry[key];
    });

    delete me[entryProp];
  };


  /**
   * 从路径字典中移除
   */
  function removeFromDictionary(hash, uid) {
    var cache;

    //移除字典中的所有路径缓存
    if (hash == undefined) {
      util.each(hashDic, function(_, key) {
        removeFromDictionary(key);
      });
      return;
    }

    cache = hashDic[hash];

    //移除该路径下的所有缓存
    if (uid == undefined) {
      util.each(cache, function(_, uniqueID) {
        removeFromDictionary(hash, uniqueID);
      });
      return;
    }

    if (!cache || !(uid in cache)) {
      return;
    }

    delete cache[uid];

    if (util.isEmptyObject(cache[uid])) {
      delete hashDic[hash];
    }
  }


  /**
   * 放入路径字典
   */
  function putIntoDictionary(entry) {
    var hash = entry.hash,
      uid = entry.uid,
      cache = hashDic[hash];

    if (!cache) {
      cache = hashDic[hash] = {};
    }

    cache[uid] = entry;
  }


  /**
   * 更新钩子
   */
  updateHooks['a'] = function(entry) {
    var elem = entry.elem,
      href, hash;

    if (!elem) {
      return;
    }

    //这里不考虑IE67的getAttribute获取href和src时
    //得到的是绝对路径的问题
    href = elem.getAttribute('href');
    hash = entry.hash;

    if (href !== hash) {
      elem.setAttribute('href', '#' + hash);
    }
  }


  /**
   * 路由器拦截事件
   */
  activeHandler = buildEntriesHandler('active');
  deactiveHandler = buildEntriesHandler('deactive');

  router.bind('intercept', function(route, routeDate, urlHash) {

    util.each(hashDic, function(cache, hash) {
      method = urlHash === hash ?
        activeHandler : deactiveHandler;

      method.call(null, cache);
    });

  });


  /**
   * 构建entry操作句柄
   * @param  {String}           method            方法名
   * @return {Function}        handler
   */
  function buildEntriesHandler(method) {
    var isActive = method === 'active';

    return function(entries) {
      util.each(entries, function(entry) {
        var handler;

        //addClass
        if (entry.activeCls) {
          util[isActive ? 'addClass' : 'removeClass'](entry.elem, entry.activeCls);
        }

        handler = entry[isActive ? 'active' : 'deactive'];
        //invokeHandler
        if (util.isFunction(handler)) {
          handler.call(entry.vm, entry);
        }

      })
    };
  }


})
