define(function(require, exports, module) {
  module.exports = [
    '<div class="l-hd m-hd {{theme}}">',
    '<!--inner-->',
    '<div class="in l-ct">',

    '<!--brand-->',
    '<div class="m-brand side">',
    '<span class="tool f-us">',
    '<i class="u-tool {{icon}}" tabindex="0" v-on="click:processIconClick"></i>',
    '</span>',
    '<span class="title f-us" tabindex="0" v-on="click:processTitleClick">{{title}}</span>',
    '</div>',
    '<!--brand End-->',

    '<!--main-->',
    '<div class="mn">',
    '<div class="holder"></div>',

    '<searchbar v-ref="searchbar"></searchbar>',

    '<selectinfobar v-ref="selectinfobar"></selectinfobar>',

    '<!--tools-->',
    '<div class="sb tools">&nbsp;</div>',
    '</div>',
    '<!--main End-->',

    '</div>',
    '<!--inner End-->',
    '</div>'
  ].join('');
})