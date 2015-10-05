/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-18 14:32:25
 * @description   顶部命令面板
 */
define(function(require, exports, module) {

  var SelectInfoBar,

    BaseComponent = require('infrastructure/component/BaseComponent'),

    template = require('common/component/viewport/partial/selectInfoBar/template');


  SelectInfoBar = module.exports = BaseComponent.extend({

    /*继承父类作用域*/
    inherit: true,

    /*模板*/
    template: template
  });

})
