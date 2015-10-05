/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 14:11:45
 * @description
 */
define(function(require, exports, module) {
  module.exports = [
    '<!--selectInfo-->',
    '<div class="middle m-selectInfo" v-if="selectInfoBar">',
    '<div class="tips">选择了 {{selectedCount}} 项内容</div>',
    '<!--tools-->',
    '<ul class="tools">',
    '<li class="u-tool push"',
    '    title="推送至测试环境"',
    '    data-command="push"',
    '    data-param="t6"></li>',
    '<li class="u-tool push"',
    '    title="推送至预发布环境"',
    '    data-command="push"',
    '    data-param="stage"></li>',
    '<li class="u-tool remove"',
    '    title="删除"',
    '    data-command="remove"></li>',
    '</ul>',
    '<!--tools-->',
    '</div>',
  ].join('')
});