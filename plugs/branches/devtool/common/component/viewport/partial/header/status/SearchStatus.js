/**
 *
 * @authors  熊洋
 * @email    xywindows@gmail.com
 * @date     2015-09-19 11:00:47
 * @version  搜索模式
 */
define(function(require, exports, module) {
  var SearchStatus,

    HeaderStatus = require('common/component/viewport/partial/header/status/HeaderStatus');

  SearchStatus = module.exports = HeaderStatus.extend('SearchStatus', {

    /*覆盖状态*/
    state: {
      //主题
      'theme': 'reverse gray',
      //图标
      'icon': 'back',

      'title': '返回'
    },

    /**
     * 重写在恢复状态之前的句柄
     */
    beforeRecorver: function() {
      var vm = this.vm,
        searchBar = vm.$['searchbar'];

      if (searchBar) {
        searchBar.triggerBlur(true);
      }
    },


    /**
     * icon点击事件处理函数
     */
    onTitleIconClick: 'recoverStatus',

    /**
     * title点击事件处理函数
     */
    onTitleTextClick: 'recoverStatus'
  });

})
