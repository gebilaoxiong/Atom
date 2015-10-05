/**
 * @authors  熊洋
 * @email    xywindows@gmail.com
 * @date     2015-10-01 16:28:01
 * @version  侧边栏
 */
define(function(require, exports, module) {

  module.exports = [
      '<!--sidebar-->',
      '<div class="l-side">',

      '  <!--nav-->',
      '  <ul class="m-nav">',

      '    <!--item-->',
      '    <li class="item" v-repeat="menus">',
      '      <a href="javascript:;" v-link="{hash:path, activeCls:\'active\'}">',
      '        <i class="u-icon {{icon}}"></i>',
      '        <span class="text">{{text}}</span>',
      '      </a>',
      '    </li>',
      '    <!--item End-->',

      '  </ul>',
      '  <!--nav End-->',

      '</div>',
      '<!--sidebar End-->',
  ].join('');

})
