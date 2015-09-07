/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-06 17:09:16
 * @description
 */
define(function(require, exports, module) {
  var urlUtil = require('utils/url'),
    pagePath = require.resolve('./index.html');

  pagePath = urlUtil.relative(urlUtil.root, pagePath);

  //创建分支面板
  chrome.devtools.panels.create("Branches", "", pagePath);
});