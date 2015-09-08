/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-08 23:24:57
 * @version  抽象类
 */
define(function(require, exports, module) {

  var Abstract,

    ClassFactory = require('utils/classFactory'),

    us = require('underscore'),

    array_shift = Array.prototype.shift,

    array_slice = Array.prototype.slice;

  Abstract = ClassFactory.define('Abstract', {
    /**
     * 获取实例的继承结构
     * @return {String} 继承结构
     */
    getXtype: function() {
      var ret = [],
        $super = this.constructor;

      do {
        $super = $super.prototype;
        ret.unshift($super.$type);
      } while ($super = $super.constructor.$superclass);

      return ret.join('/');
    }
  });

  /**
   * 调用父类中的方法
   * @param  {String}     method      方法名
   * @param  {Array}      args        参数列表
   *
   *
   * 1.调用当前方法的父类版本
   * this.callParent(arguments);
   *
   * 2.调用父类中的render方法
   * this.callParent('render',[container,position]);
   *
   */
  Abstract.prototype.callParent = function(method, args) {
    var methodName = us.isString(method) ? method : false,
      caller,
      superPorto;

    //没有提供方法名
    if (!methodName) {
      args = method;
      caller = method.callee.caller;

      methodName = caller.$name;
      superPorto = caller.$owner.$superclass.prototype;
    }

    //没有找到方法名直接返回
    if (!methodName) {
      return;
    }

    if (!superPorto) {
      caller = arguments.callee.caller.caller;
      superPorto = caller.$owner.$superclass.prototype;

      //没有找到 直接gohome
      if (!superPorto) {
        return;
      }
    }

    return methodName in superPorto ?
      superPorto[methodName].apply(this, args || []) : null;
  };

  /**
   * 派生
   */
  Abstract.extend = function() {
    var params = array_slice.call(arguments, 0);

    //插入抽象类
    params.splice(1, 0, Abstract);

    return ClassFactory.define.apply(ClassFactory, params);
  };

  /**
   * 销毁
   */
  Abstract.destroy = function(){}

})