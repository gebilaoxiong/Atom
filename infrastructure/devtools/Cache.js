/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 17:59:37
 * @description   链表结构的缓存
 *                参考https://github.com/rsms/js-lru
 *                添加pop
 */
define(function(require, exports, module) {
  var Cache,

    Abstract = require('utils/Abstract');

  Cache = module.exports = Abstract.extend({

    /**
     * 头部元素
     */
    head: undefined,

    /**
     * 尾部元素
     */
    tail: undefined,

    /**
     * 初始化
     * @param  {Int}              limit         最大存储个数
     */
    init: function(limit) {
      var me = this;

      me.size = 0;
      me.limit = limit;

      //缓存 键值映射
      me.keymap = {};
    },

    /**
     * 将元素放入到链表尾部
     * @param  {Strign}         key             键
     * @param  {Mixed}          value           值
     */
    put: function(key, value) {
      var me = this,
        entry;

      entry = {
        key: key,
        value: value
      }

      //放入缓存中
      me.keymap[key] = entry;

      //如果存在尾部元素
      if (me.tail) {
        me.tail.newer = entry;
        entry.older = me.tail;
      }
      //没有尾哪来头？
      else {
        me.head = entry;
      }


      me.tail = entry;

      //超出长度
      if (me.size === me.limit) {
        me.shift();
      } else {
        me.size++;
      }

    },

    /**
     * 从头部取出
     */
    shift: function() {
      var me = this,
        entry = me.head;

      //如果头部元素不存在
      //不执行任何代码
      if (!entry) {
        return;
      }

      //更新head元素
      me.head = entry.newer;

      if (me.head) {
        delete me.head.older;
      }

      delete entry.newer;
      delete entry.older;

      //去掉键值
      delete me.keymap[entry.key];

      return entry;
    },

    /**
     * 从尾部取出
     */
    pop: function() {
      var me = this,
        entry = me.tail;

      if(!entry){
        return;
      }

      //更新尾部元素
      me.tail = entry.older;

      if(me.tail){
        delete me.tail.newer;
      }

      delete entry.newer;
      delete entry.older;

      //去掉键值
      delete me.keymap[entry.key];

      return entry;
    },

    /**
     * 获取值 将取到的元素放置于tail位置
     * 便于下次快速访问
     * @param  {String}         key                   键值
     * @param  {Boolean}        returnEntry           是否返回entry
     */
    get: function(key, returnEntry) {
      var me = this,
        entry = me.keymap[key];

      //如果entry是在尾部 直接返回
      if (entry === me.tail) {
        return returnEntry ? entry : entry.value;
      }


      /**
       * head                           tail
       * older                          newer
       * A      B      <C>      D       E
       * <------------------------------add direction
       */
      //newer
      if (entry.newer) {
        //头部元素
        if (entry === me.head) {
          me.head = entry.newer;
        }
        entry.newer.older = entry.older; //B<--D
      }

      //older
      if (entry.older) {
        entry.older.newer = entry.newer; //B-->D
      }

      delete entry.newer;
      entry.older = me.tail;

      //尾部处理
      if (me.tail) {
        me.tail.newer = entry;
      }
      me.tail = entry;

      return returnEntry ? entry : entry.value;
    }


  });

});
