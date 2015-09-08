/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-08 23:14:36
 * @version  类型工厂
 */
define(function(require, exports, module) {
  var ClassFactory,

    us = require('underscore'),

    array_shift = Array.prototype.shift,

    array_slice = Array.prototype.slice,

    object_hasOwnProperty = Object.prototype.hasOwnProperty,

    klassCache = {};

  ClassFactory = module.exports = {

    cache: klassCache,

    /**
     * 定义一个类型
     * @param  {String}       className           类型名称
     * @param  {Function}     superclass          父类（可选）
     */
    define: function( /*className, superclass , partial1, partial2...*/ ) {
      //没有传入参数
      if (!arguments.length) {
        return;
      }

      var params = arguments,
        className = array_shift.call(params),
        parent, partial;

      //传入了基类
      if (us.isFunction(params[0])) {
        parent = array_shift.call(params);
      }

      //类
      function klass() {
        this.init && this.init.apply(this, arguments);
      }

      if (parent) {
        proto.prototype = parent.prototype;
        klass.$superclass = parent;
        parent.$subclass = parent.$subclass || [];
        parent.$subclass.push(klass);
      }

      klass.prototype = new proto;
      klass.prototype.constructor = klass;
      klass.prototype.$type = className;
      klass.$isClass = true;

      klass.extend = buildExtendMethod(klass);

      while (partial = array_shift.call(params)) {
        this.addMembers(klass, partial);
      }

      klassCache[className] = klass;
      return klass;
    },
    /**
     * 将部分类附加到类型上
     * @param {Function}        klass             类型
     * @param {Object}          partial           部分类
     */
    addMembers: function(klass, partial) {
      var proto = klass.prototype,
        i, member;

      for (i in partial) {

        //属性不是定义在原型链上的东东
        if (!object_hasOwnProperty.call(partial, i)) {
          continue;
        }

        member = partial[i];

        if (us.isFunction(member) && !member.$isClass) {
          member = wrapFunction(member);
          member.$owner = klass;
          member.$name = i;
        }

        proto[i] = member;
      }
    }
  };


  function proto() {}

  /**
   * 包裹函数
   * @param  {Function}         fn          需要包裹的函数
   */
  function wrapFunction(fn) {
    return function() {
      return fn.apply(this, arguments);
    }
  }

  /**
   * 构建扩展方法
   * @param  {Class}            klass       类型
   */
  function buildExtendMethod(klass) {
    return function() {
      var params = array_slice.call(arguments, 0);

      //插入抽象类
      params.splice(1, 0, klass);

      return ClassFactory.define.apply(ClassFactory, params);
    }
  }

})