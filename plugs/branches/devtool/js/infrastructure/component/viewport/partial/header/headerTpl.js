define(function(require, exports, module) {
  module.exports = [
    '<div class="l-hd m-hd {{theme}}">',
    '<!--inner-->',
    '<div class="in l-ct">',

    '<!--brand-->',
    '<div class="brand side">',
    '<span class="tool f-us">',
    '<i class="u-tool {{icon}}"></i>',
    '</span>',
    '<span class="title">{{title}}</span>',
    '</div>',
    '<!--brand End-->',

    '<!--main-->',
    '<div class="mn">',
    '<div class="holder"></div>',

    '<searchbar></searchbar>',

    '<selectInfo></selectInfo>',

    '<!--tools-->',
    '<div class="sb tools">&nbsp;</div>',
    '</div>',
    '<!--main End-->',

    '</div>',
    '<!--inner End-->',
    '</div>'
  ].join('');
})