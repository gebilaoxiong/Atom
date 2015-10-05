/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 16:37:39
 * @description   视窗容器
 *                具有控制视图加载的能力
 */
define(function(require, exports, module) {

  var Viewport,

    util = require('infrastructure/util'),

    BaseComponent = require('infrastructure/component/BaseComponent'),

    RouteDataMapper = require('infrastructure/route/RouteDataMapper'),

    ViewLoader = require('infrastructure/component/ViewLoader'),

    Header = require('common/component/viewport/partial/header/Header'),

    Sidebar = require('common/component/viewport/partial/sidebar/Sidebar'),

    template = [
      '<div class="l-vp">',
      '   <header></header>',
      '   <div class="l-ct l-bd"><sidebar></sidebar></div>',
      '</div>'
    ].join('');

  Viewport = module.exports = BaseComponent.extend({

    replace: false,

    template: template,

    /**
     * 组件
     * @type {Object}
     */
    components: {
      header: Header,

      sidebar:Sidebar
    },

    /**
     * 创建句柄
     */
    created: function() {
      var me = this,
        initConfig = me.$initConfig;

      //初始化视图加载器事件监听
      me.initViewLoaderListener();

      if (!('routeDataMapper' in initConfig)) {
        throw 'routeDataMapper config is undefined';
      }

      //初始化路由数据映射
      me.routeDataMapper = new RouteDataMapper(initConfig.routeDataMapper);
    },

    /**
     * 方法
     */
    methods: {
      /**
       * 初始化加载器事件处理
       */
      initViewLoaderListener: function() {
        var me = this;

        if (!me.viewProxyListener) {

          me.viewProxyListener = {
            //页面加载前（mask）
            beforeload: me.onBeforeLoadView,
            //加载完成(unmask)
            complete: me.onViewLoadComplete,
            //加载成功
            success: me.onViewLoadSuccess,
            //加载失败
            failure: me.onViewloadFailure,
            //取消加载
            cancel: me.onCancelLoadView,

            scope: me
          };
        }
      },

      /**
       * 加载view
       * @param  {string}               operation             操作
       * @param  {Object}               routeData             路由数据
       * @param  {object}               viewConfig            view初始化对象
       */
      loadView: function(operation, routeData, viewConfig) {
        var me = this,
          path;

        if (me.loading || (!routeData || !util.isObject(routeData)) || !operation) {
          return;
        }

        path = me.routeDataMapper.map(routeData);

        me.createLoadViewProxy(
          operation,
          path,
          viewConfig,
          me.viewProxyListener).load();
      },

      /**
       * view加载前事件处理函数
       * @param  {string}               operation             操作(redirect||open)
       * @param  {LoadViewProxy}        loadProxy             加载代理
       * @param  {string}               url                   加载路径
       * @param  {object}               viewConfig            view初始化对象
       */
      onBeforeLoadView: function(operation, loadProxy, url, viewConfig) {
        var me = this;

        me.loading = true; //进入加载状态
      },

      /**
       * view加载完毕事件处理函数
       * @param  {string}               status                 加载状态（success||failure）
       * @param  {LoadViewProxy}        loadProxy              加载代理
       * @param  {string}               operation              操作(redirect||open)
       * @param  {string}               url                    加载路径
       * @param  {object}               viewConfig             view初始化对象
       */
      onViewLoadComplete: function() {
        var me = this;

        me.loading = false; //退出加载状态
      },


      /**
       * view加载成功处理函数
       * @param  {LoadViewProxy}  loadProxy     加载代理
       * @param  {string}         operation     操作(redirect||open)
       * @param  {Type}           viewType      请求的view类型
       * @param  {object}         viewConfig    view初始化对象
       */
      onViewLoadSuccess: function(loadProxy, operation, viewType, viewConfig) {
        viewConfig = viewConfig || {};
        //我们不在这里实例化viewType加到容器中
        viewConfig.xtype = viewType;

        this.setView(viewConfig);
      },

      /**
       * view加载失败处理函数
       * @param  {ViewLoadException}  $error        错误类型
       * @param  {LoadViewProxy}      loadProxy     加载代理
       * @param  {string}             operation     操作(redirect||open)
       * @param  {string}             url           加载路径
       * @param  {object}             viewConfig    view初始化对象
       */
      onViewloadFailure: function($error, loadProxy, operation, url, viewConfig) {
        var me = this;

        //对话框显示错误信息
        alert('跳转到404')
      },

      /**
       * 取消view加载
       * @param  {LoadViewProxy}    loadProxy     加载代理
       * @param  {string}           operation     操作(redirect||open)
       * @param  {string}           url           加载路径
       * @param  {object}           viewConfig    view初始化对象
       */
      onCancelLoadView: function(loadProxy, operation, url, viewConfig) {
        var me = this;

        me.loading = false; //退出加载状态
        // me.confirmInfo(
        //   '确认',
        //   '是否取消加载页面？',
        //   confiremCancelLoadCallback,
        //   loadProxy);
      },



      /**
       * 导航到
       * @param  {Object}         routeDate       路由数据
       */
      navigate: function(routeDate) {

      }
    }
  });
});
