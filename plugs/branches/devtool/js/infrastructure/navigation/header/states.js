/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-15 11:23:41
 * @description
 */
define(function(require, exports, module) {

  var State, NormalState, SearchState;

  /**
   * 正常状态
   */
  State = Q.Class.define({

    /**
     * 宿主
     */
    host: undefined,

    /**
     * 宿主状态
     */
    state: undefined,

    /**
     * 缓存
     */
    cache: undefined,

    /**
     * 初始化
     */
    init: function(config) {
      var me = this;

      $.extend(me, config);

      me.cache = {};
    },

    /**
     * 将状态应用于宿主
     * @param  {Component}      host        宿主
     */
    applyState: function(host) {
      var me = this,
        hostId, state;

      host = host || me.host;
      hostId = host.getId();

      //缓存中不存在 当前宿主状态
      if (!me.cache[hostId]) {
        me.cache[hostId] = host.getState();
      }

      host.applyState(me.state);
    },

    /**
     * 恢复宿主的状态
     * @param  {Component}      host        宿主
     */
    recover: function(host) {
      var me = this,
        hostId, state;

      host = host || me.host;
      hostId = host.getId();

      if (!(state = me.cache[hostId])) {
        host.applyState(state);
        delete me.cache[hostId];
      }
    }
  });

  /**
   * 搜索状态
   */
  SearchState = exports.SearchState = Q.Class.define(State, {
    state: {
      cls: 'l-hd m-hd lightBlue',
      title: '返回',
      iconCls: 'u-tool back',
      searchEl: true,
      stateEl: false
    }
  });


});