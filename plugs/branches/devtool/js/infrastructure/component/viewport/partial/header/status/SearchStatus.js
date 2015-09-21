/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-19 11:00:47
 * @version  搜索模式
 */
define(function(require, exports, module) {
  var SearchStatus,

    HeaderStatus = require('infrastructure/component/viewport/partial/header/status/HeaderStatus');

  SearchStatus = module.exports = HeaderStatus.extend('SearchStatus', {

    /*覆盖状态*/
    state: {
      //主题
      'theme': 'lightBlue',
      //图标
      'icon': 'back',

      'title': '返回'
    },


    /**
     * icon点击事件处理函数
     */
    onIconClick: 'recoverStatus'

  });

})