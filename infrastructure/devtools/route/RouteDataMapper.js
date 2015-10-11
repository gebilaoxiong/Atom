/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 09:53:46
 * @description   路径映射  routeData => Path
 */
define(function(require, exports, module) {
  var RouteDataMapper,

    Abstract = require('utils/Abstract'),

    util = require('infrastructure/util'),

    Cache = require('infrastructure/Cache');

  RouteDataMapper = module.exports = Abstract.extend('RouteDataMapper', {

    /*文件夹名称*/
    dir: '',

    /*路径格式*/
    format: undefined,

    /*转换历史*/
    history: undefined,

    /*当前的路由数据*/
    vernier: undefined,

    init: function(config) {
      var me = this;

      util.extend(me, config);

      me.history = new Cache(1000);

      if (me.format && util.isString(me.format)) {
        //名键值格式化
        me.format = util.formater(me.format, true);
      }
    },

    /**
     * 映射操作
     * @param  {undefined||Number||Object}    routeData        当前游标值对应的routeData||
     *                                                         当前有标志+number对应的routeData||
     *                                                         路由数据
     *
     *
     *
     * 1.routeDataMapper.map();                                映射前一次操作的routeData
     *
     * 2.routeDataMapper.map(-2);                              映射前两次操作的routeData
     *
     * 3.routeDataMapper.map(object);                          将object进行映射
     */
    map: function(routeData) {
      var me = this,
        history = me.history,
        vernier, path, routeDataType;

      //类型判断
      routeDataType = util.type(routeData);

      //传入的是数字
      if (routeDataType === 'number') {
        vernier = routeData;

        //转换为routeData
        while ((routeData = history.pop()) && vernier < 0) {
          vernier++;
        }

        routeData = vernier.value;
      }

      path = me.format(routeData);

      if (me.dir) {
        path = me.dir + '/' + path;
      }

      //插入转换历史
      me.history.put(path, routeData);

      return path;
    },

    destroy: function() {
      var me = this;

      me.history.clear();

      delete me.format;
      delete me.history;
    }
  });
})
