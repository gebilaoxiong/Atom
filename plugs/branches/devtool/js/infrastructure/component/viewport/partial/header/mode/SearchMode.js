/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-19 11:00:47
 * @version  搜索模式
 */
define(function(require, exports, module) {
  var SearchMode,

    BaseMode = require('infrastructure/component/viewport/partial/header/mode/BaseMode');

  SearchMode = module.exports = BaseMode.extend('SearchMode', {

    state: {
      //主题
      'theme': 'lightBlue',
      //图标
      'icon': 'back',

      'title': '返回'
    }

  });

})