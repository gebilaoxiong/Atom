/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-13 10:41:43
 * @version  导航面板头部
 */
define(function(require, exports, module) {

  var Header,

    $ = require('controls'),

    innerInnerTpl = require('./innerTpl');

  Header = module.exports = Q.Class.define($.Container, {

    cls: 'l-hd m-hd',

    /**
     * 图标ClassName
     * @type {String}
     */
    iconCls: '',

    /**
     * 标题
     * @type {String}
     */
    title: '',

    /**
     * 重写绘制
     */
    onRender: function() {
      var me = this,
        innerEl;

      //调用父类方法
      me.callParent(arguments);

      innerEl = me.el.insertAdjacentHTML('afterbegin', innerInnerTpl);

      me.innerEl = Q.get(innerEl);
      //图标
      me.iconEl = Q.get('.brand .u-tool', innerEl);
      //标题元素
      me.titleEl = Q.get('.brand .title', innerEl);
      //布局元素
      me.layoutEl = Q.get('.mn', innerEl);

      //状态面板
      me.stateEl = Q.get('.m-state', me.layoutEl.dom);
      //搜索面板
      me.searchEl = Q.get('.m-search', me.layoutEl.dom);
    },

    /**
     * 重写绘制后阶段
     */
    afterRender: function() {
      var me = this;

      if (me.title) {
        me.setTitle(me.title);
      }

      if (me.iconCls) {
        me.setIconCls(me.iconCls);
      }

      me.callParent(arguments);
    },

    /**
     * 设置图标
     */
    setIconCls: function(iconCls) {
      var me = this,
        iconEl = me.iconEl,
        orgCls = me.iconCls;

      if (!me.iconEl || orgCls == iconCls) {
        return;
      }

      me.iconCls = iconCls;

      me.iconEl.attr('class', iconCls);

      me.fire('iconchange', me, iconCls, orgCls);
    },

    /**
     * 设置标题
     */
    setTitle: function(title, iconCls) {
      var me = this,
        titleEl = me.titleEl;

      me.title = title;

      if (titleEl) {
        titleEl.text(title);
      }

      if (iconCls) {
        me.setIconCls(iconCls);
      }

      me.fire('titlechange', me, title);
    },

    /**
     * 布局元素
     */
    getLayoutTarget: function() {
      return me.layoutEl;
    },

    /**
     * 获取状态
     */
    getState: function() {
      var me = this,
        method;

      return {
        cls: me.cls,
        title: me.title,
        iconCls: me.iconCls,
        searchEl: !me.searchEl.isHidden(),
        stateEl: !me.stateEl.isHidden()
      };
    },

    /**
     * 应用状态
     * @param  {Object}       state     状态对象
     */
    applyState: function(state) {
      var me = this;

      //title
      if ('title' in state) {
        me.setTitle(state.title);
      }

      //iconCls
      if ('iconCls' in state) {
        me.setIconCls(state.iconCls);
      }

      //cls
      if ('cls' in state) {
        me.el.attr('class', state.cls);
      }

      //searchEl
      if ('searchEl' in state) {
        method = state.searchEl === false ? 'hide' : 'show';
        me.searchEl[method]();
      }

      //stateEl
      if ('stateEl' in state) {
        method = state.stateEl === false ? 'hide' : 'show';
        me.stateEl[method]();
      }

    }

  });
});