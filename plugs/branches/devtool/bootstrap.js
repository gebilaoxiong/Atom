/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-08 18:04:49
 * @description
 */
// 将标签页标识符发送至后台网页
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // 处理后台网页的响应（如果有的话）。
});

chrome.runtime.sendMessage({
  age:123
});