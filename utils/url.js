/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-06 22:42:56
 * @version  $Id$
 */
define(function(require, exports, module) {
  var resolve;

  exports.root = require.resolve('../');


  /**
   * 将to转换为相对路径(URL)
   */
  exports.relative = function(from, to) {
    var ret = [],
      fromPartials, toPartials, len,
      i, sameIndex;

    //通过分隔符切割为字符串数组
    fromPartials = trimArray(from.split('/'));
    toPartials = trimArray(to.split('/'));

    //获取最小长度
    len = Math.min(fromPartials.length, toPartials.length);

    //获取两个路径中相同的索引
    sameIndex = len;
    for (i = 0; i < len; i++) {
      if (fromPartials[i] !== toPartials[i]) {
        sameIndex = i;
        break;
      }
    }

    //获取from中相对于相同节点的相对路径
    for (i = sameIndex, len = fromPartials.length; i < len; i++) {
      ret.push('..');
    }

    //连接to中不同的部分
    ret = ret.concat(toPartials.slice(sameIndex));

    return ret.join('/');
  }

  /**
   * 去掉数组中两端的空白元素
   */
  function trimArray(arr) {
    var lastIndex = arr.length - 1,
      start, end;

    //找到数组第一个非空的索引
    start = 0;
    for (; start < lastIndex; start++) {
      if (arr[start]) {
        break;
      }
    }

    end = lastIndex;
    for (; end > 0; end--) {
      if (arr[end]) {
        break;
      }
    }

    if (start === 0 && end === lastIndex) {
      return arr
    }

    if (start > end) {
      return [];
    }

    return arr.slice(start, end + 1);
  }

});