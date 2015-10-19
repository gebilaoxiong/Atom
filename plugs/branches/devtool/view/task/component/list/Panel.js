/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-10-20 00:11:39
 * @description   列表面板
 */
define(function(require, exports, module) {

  var Panel,

    ListPanel = require('common/component/list/Panel'),

    template = require('view/task/component/list/template');


  Panel = module.exports = ListPanel.extend({

    template: template,

    data: function() {
      return {
        title: '本月',
        list: [{
          title: '申请退款',
          branche: '25',
          description: '申请退款项目',
          createDate: Date.now()
        },{
          title: '雇主保障入口优化',
          branche: '8',
          description: '雇主保障入口优化项目',
          createDate: Date.now()
        },{
          title: '数据看板',
          branche: '2',
          description: '服务宝数据看板',
          createDate: Date.now()
        }]
      };
    }

  });

});
