/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 16:37:39
 * @description   视窗容器模板
 */
define(function(require, exports, module) {

  module.exports = [
    '<div class="m-vp">',

    '   <header v-ref="header"></header>',

    '   <div class="l-ct m-bd">',

    '     <sidebar></sidebar>',

    '     <div class="l-mn">',

    '       <div class="in">',

    '         <view route="root,view" path="view/{module}/{partial}/index" onchange="onViewChange"></view>',

    '       </div>',

    '     </div>',

    '   </div>',

    '</div>'
  ].join('');

})
