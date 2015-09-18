/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 11:28:52
 * @description   应用程序header
 *                有没有发现VUE的MVVM之道的不足之处在于 
 *                很多数据都是状态
 */
define(function(require, exports, module) {
  var Header,

    AbstractComponent = require('infrastructure/component/AbstractComponent'),

    template = require('infrastructure/component/header/headerTpl'),

    searchTpl = require('infrastructure/component/header/searchTpl'),

    stateTpl = require('infrastructure/component/header/stateTpl');

  Header = module.exports = AbstractComponent.extend({

    template: template,

    /*子组件*/
    components: {

      search: {
        inherit: true,
        template: searchTpl
      },

      state: {
        inherit: true,
        template: stateTpl
      }

    },

    /*数据*/
    data: function() {

      return {
        //样式
        theme: '',
        //图标
        icon: 'menu',
        //title
        title: '任务管理',

        searchBar: true,

        stateBar: false,

        //选中行个数
        selectedCount: 0
      };
    }

  });
})