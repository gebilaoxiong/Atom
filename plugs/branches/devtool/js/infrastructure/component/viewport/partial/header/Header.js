/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 11:28:52
 * @description   应用程序header
 *                有没有发现VUE的MVVM之道的不足之处在于 
 *                一个VM有很多数据都是状态
 *                而她把它们当做数据来处理
 */
define(function(require, exports, module) {
  var Header,

    status = {},

    util = require('infrastructure/util'),

    BaseComponent = require('infrastructure/component/BaseComponent'),

    template = require('infrastructure/component/viewport/partial/header/headerTpl'),

    SearchBar = require('infrastructure/component/viewport/partial/searchBar/SearchBar'),

    SelectInfoBar = require('infrastructure/component/viewport/partial/selectInfoBar/SelectInfoBar');

  //加载状态
  status['search'] = require('infrastructure/component/viewport/partial/header/status/SearchStatus');

  Header = module.exports = BaseComponent.extend({

    /*模板*/
    template: template,

    /*子组件*/
    components: {

      /*搜索面板*/
      searchbar: SearchBar,

      /*命令面板*/
      selectinfobar: SelectInfoBar

    },

    /*数据*/
    data: function() {

      return {
        //样式
        'theme': '',
        //图标
        'icon': 'menu',
        //title
        'title': '任务管理',

        'searchBar': true,

        'stateBar': false,

        //选中行个数
        'selectedCount': 0
      };
    },

    /**
     * 回调钩子
     */
    created: function() {
      var me = this;

      me.initModes();
    },

    /*实例方法*/
    methods: {

      /**
       * 初始化模式集合
       */
      initModes: function() {
        var me = this,
          config, statusName;

        //如果已完成模式初始化
        if (me.statusCache) {
          return;
        }

        //配置
        config = {
          vm: me
        };

        me.statusCache = {};

        for (statusName in status) {
          me.statusCache[statusName] = new status[statusName](config);
        }
      },

      /**
       * 设置模式
       * @param {String}          statusName            模式名称
       */
      setStatus: function(statusName) {
        var me = this,
          lastMode;

        //移除上一个状态
        if (lastMode = me.status) {

          lastMode.recover();
        }

        delete me.status;

        //没有传入模式
        if (statusName == undefined || !(statusName in me.statusCache)) {
          return;
        }

        me.status = me.statusCache[statusName];

        me.status.apply();
      },

      /**
       * 恢复应用模式之前的状态
       */
      recoverStatus: buildChangeModeHandler(null),

      /**
       * 点击图标处理函数
       */
      processIconClick: invokeStatusMethod('onIconClick')

    },

    /*事件处理函数*/
    events: {
      /**
       * 搜索面板获取焦点处理事件
       */
      'searchbar:onfocus': buildChangeModeHandler('search'),

      /**
       * 搜索面板失去焦点处理事件
       */
      'searchbar:onblur': 'recoverStatus'
    }

  });

  /**
   * 变更状态
   * @param  {String}         statusName          模式名称
   * @param  {Boolean}        cancelBubble        是否取消冒泡
   */
  function buildChangeModeHandler(statusName, cancelBubble) {

    return function() {
      this.setStatus(statusName);

      return cancelBubble !== true ? undefined : false;
    };
  }


  /**
   * 调用状态的方法
   * @param  {string}         methodName          方法名称
   * @param  {function}       defaultMethod       默认处理方法
   */
  function invokeStatusMethod(methodName, defaultMethod) {
    return function() {
      var me = this,
        status = me.status,
        method;

      method = status ? status[methodName] : defaultMethod;

      //如果是字符串 转换为VM的方法
      if (util.isString(method)) {
        method = me[method];
      }

      if (method == undefined) {
        return;
      }

      return method.apply(me, arguments);
    };
  }



})