/**
 * 
 * @authors  熊洋 
 * @email    xywindows@gmail.com
 * @date     2015-09-06 22:42:56
 * @version  $Id$
 */
define(function(require, exports, module) {
  var resolve;

  /**
   * 将to转换为绝对路径
   */
  resolve = exports.resolve = function(to) {
    return seajs.resolve(to);
  }


  /**
   * 将to转换为相对路径(URL)
   */
  exports.relative = function(from, to) {
    var ret = [],
      fromPartials, toPartials, len,
      i, sameIndex;

    //将路径转换为绝对路径
    from = resolve(from);
    to = resolve(to);

    //通过分隔符切割为字符串数组
    fromPartials = from.split('/');
    toPartials = to.split('/');

    //获取最小长度
    len = Math.min(fromPartials.length, toPartials.length);

    //获取两个路径中相同的索引
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

});