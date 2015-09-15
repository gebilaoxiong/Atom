/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-15 09:50:55
 * @description
 */
define(function() {

  module.exports = [
    '<!--inner-->',
    '<div class="in l-ct">',

    '<!--brand-->',
    '<div class="brand side">',
    '<span class="tool f-us">',
    '<i class="u-tool reverse menu"></i>',
    '</span>',
    '<span class="title">任务管理</span>',
    '</div>',
    '<!--brand End-->',

    '<!--main-->',
    '<div class="mn">',

    '<div class="holder"></div>',

    '<!--search-->',
    '<div class="middle m-search">',
    '<span class="icon"><i class="u-icon search"></i></span>',
    '<input class="kw" placeholder="搜索"/>',
    '</div>',

    '<!--state-->',
    '<div class="middle m-state">',

    '<div class="tips">选择了 0 项内容</div>',

    '<!--tools-->',
    '<ul class="tools">',
    '<li class="u-tool push"',
    'title = "推送至测试环境"',
    'data - command = "push"',
    'data - param = "t6" > < /li>',

    '<li class="u-tool push"',
    'title = "推送至预发布环境"',
    'data - command = "push"',
    'data - param = "stage" > < /li>',

    '<li class="u-tool remove"',
    'title = "删除"',
    'data - command = "remove" > < /li>',
    '</ul>',
    '<!--tools-->',

    '</div>',
    '<!--tools-->',
    '<div class="sb tools">&nbsp;</div>',

    '</div>',
    '<!--main End-->',

    '</div>',
    '<!--inner End-->'
  ].join('')

});