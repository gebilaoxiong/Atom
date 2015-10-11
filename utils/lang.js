/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 10:27:25
 * @description   工具类 对js语言本身的扩充
 */
define(function(require, exports, module) {
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g,
    core_toString = Object.prototype.toString,
    core_hasOwnProperty = Object.prototype.hasOwnProperty,
    core_slice = Array.prototype.slice,
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
   * 类型判定:是否为数字
   */
  exports.isNumber = function(input){
    return !isNaN(parseFloat(input)) && isFinite(input); //是否无穷大
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
   * 是否为空对象
   * @param  {Object}             obj             需要检测的对象
   */
  exports.isEmptyObject = function(obj) {
    var key;

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }

  /**
   * 生成为一键
   */
  var uid = 0;
  exports.uniqueId = function(prefix) {
    return (prefix || 'atom') + uid++;
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
   * 返回一个格式化函数
   * @param  {String}     format      字符串格式
   * @param  {Boolean}    byKeys      是否按名键值方式替换
   */
  exports.formater = function(format, byKeys) {
    return byKeys !== true ?

      //按参数索引的方式格式化
      function() {
        var input = format,
          i, len;
        //按参数索引的方式格式化
        for (i = 0, len = arguments.length; i < len; i++) {
          input = input.replace(new RegExp('\\{' + i + '\\}', 'g'), String(arguments[i]));
        }
        return input;
      } :

      //按第一个参数的名键值方式替换
      function(args) {
        var input = format,
          i;

        if (args == null) {
          return '';
        }

        for (i in args) {
          input = input.replace(new RegExp('\\{' + i + '\\}', 'g'), String(args[i]));
        }
        return input;
      };
  }

  /**
   * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，
   * 最多每隔 wait毫秒调用一次该函数。
   * @param  {function}       func                函数
   * @param  {int}            wait                时间段（单位：毫秒）
   * @param  {object}         scope               上下文
   * @param  {object}         options             选项
   *                                              {leading:false,trailing:false}
   */
  exports.throttle = function(func, wait, scope, options /*optional*/ ) {
    var previous = 0,
      later, context, params,
      timer;

    options = options || {};

    //延迟执行委托
    later = function() {
      //如果为首次执行 重置previous
      previous = options.leading ? 0 : Date.now();

      timer = null;

      func.apply(context, params);

      context = params = null;
    }

    return function() {
      var now = Date.now(),
        remaining;

      //previous为0 且 leading为true
      if (!previous && options.leading === true) {
        previous = now;
      }

      //计算超期时间
      remaining = wait - (now - previous);

      context = scope || this;
      params = arguments;

      if (remaining <= 0 || remaining > wait) {
        //清除定时器
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        previous = now;

        func.apply(context, params);

        context = params = null;

      } else if (!timer && options.trailing !== false) {
        timer = setTimeout(later);
      }

    }

  }

  /**
   * 延迟执行函数
   * @param  {Function}       func          需要延迟执行的函数
   * @param  {Int}            wait          等待的毫秒数
   * @param  {Object}         scope         上下文
   * @param  {Array}          params        参数
   */
  exports.delay = function(func, wait, scope, params) {
    var handler, args;

    //委托
    handler = scope || params ?
      function() {
        func.apply(scope, args);
        args = null;
      } :
      func;

    //默认参数列表
    if (!params) {
      params = [];
    }

    return function() {
      args = params.concat(core_slice.call(arguments));
      return setTimeout(handler, wait);
    };
  }

  /**
   * 将字符串转换为首字母大写
   * @param  {String} input 需要转换的字符串
   */
  exports.cap = function(input) {
    input = String(input);

    return input.charAt(0).toUpperCase() + input.slice(1);
  }


  /**
   * 空函数
   */
  exports.noop = function() {}


})
