/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 10:27:25
 * @description   对Vue.util的补充
 */
define(function(require, exports, module) {
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g,
    core_toString = Object.prototype.toString,
    core_hasOwnProperty = Object.prototype.hasOwnProperty,
    each, getType;

  /**
   * 转义字符串中的正则关键字
   * @param  {String}         str               字符串
   */
  exports.escapeRegex = function(str) {
    return str.replace(regexEscapeRE, '\\$&');
  };


  /**
   * 迭代器
   * @param  {Mixed}          iterable          需要迭代的对象
   * @param  {Function}       fn                迭代函数
   * @param  {Object}         context           上线文
   */
  exports.each = each = function(iterable, fn, context) {
    var i, item;

    if (!iterable || !fn) {
      return;
    }

    //数组 类数组
    if (
      iterable.length &&
      core_toString.call(iterable) != '[object String]'
    ) {

      for (i = 0; i < iterable.length; i++) {
        item = iterable[i];

        //返回false中断迭代
        if (fn.call(context || item, item, i, iterable) === false) {
          break;
        }
      }

    }
    //对象
    else {

      for (i in iterable) {
        if (!core_hasOwnProperty.call(iterable, i)) continue;
        item = iterable[i];

        if (fn.call(context || item, item, i, iterable) === false) {
          break;
        }
      }

    }
  };



  /*
      复制

      浅度复制
      1.extend(target,src1...)

      深度复制
      2.extend(true,target,src1...)
  */
  exports.extend = function() {
    var target = arguments[0] || {},
      i = 1,
      len = arguments.length,
      deep = false,
      option, src, copy, name, isArray, clone;

    //深度/浅度复制
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1];
      i = 2;
    }

    for (; i < len; i++) {
      if ((option = arguments[i]) != null) {
        for (name in option) {
          src = target[name];
          copy = option[name];

          //同一引用对象
          if (src === copy) {
            continue;
          }

          //深度复制
          if (deep && copy && (isObject(copy) || (isArray = exports.isArray(copy)))) {

            if (isArray) {
              isArray = false;
              clone = src && exports.isArray(src) ? src : [];
            } else {
              clone = src && exports.isObject(src) ? src : {};
            }

            target[name] = arguments.callee(deep, clone, copy);

          }
          //浅度复制
          else if (option.hasOwnProperty(name)) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  }


  /**
   * 类型判定
   */
  var class2type = {};

  each('String Array Number Boolean Date Function RegExp Object'.split(' '), function(item) {
    class2type['[object ' + item + ']'] = item.toLowerCase();
  });

  exports.type = getType = function(obj) {
    return obj != undefined ? class2type[core_toString.apply(obj)] || 'object' : String(obj);
  }

  /**
   * 类型判定:是否为布尔值
   * @param  {Mixed}          obj         需要判定的对象
   */
  exports.isBool = function(obj) {
    return getType(obj) === 'boolean';
  }

  /**
   * 类型判定:是否为字符串
   * @param  {Mixed}          obj         需要判定的对象
   */
  exports.isString = function(obj) {
    return getType(obj) === 'string';
  }

  /**
   * 类型判定:是否为函数
   * @param  {Mixed}          obj         需要判定的对象
   */
  exports.isFunction = function(obj) {
    return getType(obj) === 'function';
  }

  /**
   * 类型判定:是否为对象
   * @param  {Mixed}          obj         需要判定的对象
   */
  exports.isObject = function(obj) {
    return getType(obj) === 'object';
  }

  /**
   * 类型判定:是否为数组
   * @param  {Mixed}          obj         需要判定的对象
   */
  exports.isArray = function(obj) {
    return getType(obj) === 'array';
  }


  /**
   * 类型判定:是否为Window对象
   * @param  {Mixed}          obj         需要判定的对象
   */
  exports.isWindow = function(obj) {
    return obj != null && obj == obj.window;
  }


  /**
   * 检查对象是否为一个纯粹的对象
   * @param  {Mixed}          obj         需要判定的对象
   */
  exports.isPlainObject = function(obj) {
    var key;

    if (!obj || getType(obj) !== 'object' || obj.nodeType || exports.isWindow(obj)) {
      return false;
    }

    //ie8中
    //迭代属性的时候 不是像标准浏览器一样（先迭代自身属性 再迭代原型链上的）
    //而是先迭代原型链上的属性（按赋值先后顺序 PS这TM高科技是怎么做到的？）
    //最后再迭代自身属性
    //所以我们用isPrototypeOf检测构造函数的原型链
    //如果原型链没有isPrototypeOf 那么就不是一个纯粹的对象
    try {
      if (obj.constructor &&
        !core_hasOwnProperty.call(obj, "constructor") &&
        !core_hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      return false;
    }

    for (key in obj) {}

    //迭代的时候原型链上的属性出现的顺序总是在当前属性的后面
    //所以我们只需要检测key是否是自身属性
    return key == undefined || core_hasOwnProperty.call(obj, key);
  }

  /**
   * 生成为一键
   */
  var uid = 0;
  exports.uniqueId = function() {
    return 'atom' + uid++;
  }


  /**
   * 属性提取生成器
   * @param  {String}     props        属性提取生成器
   */
  exports.extractor = function(props) {
    var hasSpe; //是否有分隔符

    //将属性名切割成数组
    if (hasSpe = props.indexOf(dot) !== -1) {
      props = props.split('.');
    }

    return hasSpe ?
      function(obj) {
        var ret = obj,
          i, len, prop;

        for (i = 0, len = props.length; i < len; i++) {
          //属性名
          prop = props[i];

          if (prop in ret) {
            ret = ret[prop];
          }
          //如果属性名不存在 返回undefined
          else {
            ret = undefined;
            break;
          }
        }

        return ret;
      } :
      function(obj) {
        return props in obj ? obj[props] : undefined;
      }
  }

  /**
   * 空函数
   */
  exports.noop = function() {}


})