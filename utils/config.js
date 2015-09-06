/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-06 14:03:25
 * @description   配置文件
 */
define(function(require, exports, module) {
  var config = require('plugs.config'),

    plugNames;

  //所有的插件名称
  plugNames = Object.keys(config);


  /**
   * 加载初始化文件
   * @param  {String}       type        初始化类型(background|devtools|popup)
   * @param  {Function}     callback    回调
   */
  exports.loadInitFiles = function(type, callback) {
    var files = [];

    plugNames.forEach(function(name) {
      var plugCfg = config[name];

      //未禁用
      if (type in plugCfg && !plugCfg.disabled) {
        files.push('pulgs/' + name + '/' + plugCfg[type]);
      }
    });

    return require.async(files, callback);
  }

});