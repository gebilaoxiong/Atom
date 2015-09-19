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

    modes = {},

    util = require('infrastructure/util'),

    BaseComponent = require('infrastructure/component/BaseComponent'),

    template = require('infrastructure/component/viewport/partial/header/headerTpl'),

    SearchBar = require('infrastructure/component/viewport/partial/searchBar/SearchBar'),

    SelectInfoBar = require('infrastructure/component/viewport/partial/selectInfoBar/SelectInfoBar');

  //加载状态
  modes['search'] = require('infrastructure/component/viewport/partial/header/mode/SearchMode');

  Header = module.exports = BaseComponent.extend({

    /*模板*/
    template: template,

    /*子组件*/
    components: {

      /*搜索面板*/
      searchbar: SearchBar,
      /*命令面板*/
      selectInfo: SelectInfoBar

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
          config, modeName;

        //如果已完成模式初始化
        if (me.modes) {
          return;
        }

        //配置
        config = {
          vm: me
        }

        me.modes = {};

        for (modeName in modes) {
          me.modes[modeName] = new modes[modeName](config);
        }
      },

      /**
       * 设置模式
       * @param {String}          modeName            模式名称
       */
      setMode: function(modeName) {
        var me = this,
          lastMode;

        //移除上一个状态
        if (lastMode = me.mode) {

          lastMode.regain();
        }

        //没有传入模式
        if (modeName == undefined || !(modeName in me.modes)) {
          return;
        }

        me.mode = me.modes[modeName];

        me.mode.applyState();
      }

    },

    /*事件处理函数*/
    events: {
      /**
       * 搜索面板获取焦点处理事件
       */
      'searchbar:onfocus': generateChangeModeHandler('search'),

      /**
       * 搜索面板失去焦点处理事件
       */
      'searchbar:onblur': generateChangeModeHandler(null)
    }

  });

  /**
   * 变更状态
   * @param  {String}         modeName          模式名称
   * @param  {Boolean}        cancelBubble      是否取消冒泡
   */
  function generateChangeModeHandler(modeName, cancelBubble) {

    return function() {
      this.setMode(modeName);

      return cancelBubble !== true ? undefined : false;
    };
  }



})