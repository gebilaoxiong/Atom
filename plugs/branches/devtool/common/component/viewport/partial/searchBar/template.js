/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 14:11:35
 * @description
 */
define(function(require, exports, module) {

  module.exports = [
    '<!--search-->',
    '<div class="m-search" v-if="searchBar">',
      '<span class="icon"><i class="u-icon search"></i></span>',
      '<input class="kw" placeholder="搜索" v-on="focus:onFocus"/>',
    '</div>'
  ].join('');
});
