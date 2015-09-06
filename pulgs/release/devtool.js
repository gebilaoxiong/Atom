/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-06 17:09:16
 * @description
 */
define(function(require, exports, module) {

  var pagePath = require.resolve('./index.html');


  //创建发布面板
  chrome.devtools.panels.create("Release", "", pagePath);
});