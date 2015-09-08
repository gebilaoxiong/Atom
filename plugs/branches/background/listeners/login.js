/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-08 23:55:44
 * @version  $Id$
 */
define(function(require, exports, module) {

  chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    
    var x = new XMLHttpRequest();
    x.open('GET', 'https://www.baidu.com/');
    x.onload=function(){
      alert(x.response)
    }

    x.send();

  });

})