/**
 *
 * @authors  熊洋
 * @email    xywindows@gmail.com
 * @date     2015-09-19 11:44:22
 * @version  VM状态管理 单例
 */
define(function(require, exports, module) {

  var util=require('infrastructure/util');

  module.exports = {
    /**
     * 获取记录的状态
     * @param  {String}         key          键
     * @return {Object}                      状态对象
     */
    get: util.noop,

    /**
     * 设置记录的状态
     * @param  {String}         key          键
     * @param  {Object}         value        状态对象
     */
    set: util.noop,

    /**
     * 删除记录的状态
     * @param  {String}         key          键
     * @return {Object}                      状态对象
     */
    remove: util.noop
  }

})
