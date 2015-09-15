/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-15 11:23:41
 * @description
 */
define(function(require, exports, module) {

  var State;

  /**
   * 正常状态
   */
  State = Q.Class.define({

    /**
     * 宿主
     */
    host: undefined,

    /**
     * 初始化
     */
    init: function(config) {
      var me = this;

      $.extend(me, config);
    },

    //生效
    effect: function() {

    },

    //恢复
    recover: function() {

    }
  });


});