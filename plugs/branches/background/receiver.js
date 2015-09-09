/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-09 13:34:05
 * @description
 */
define(function(require, exports, module) {
  var Receiver = require('utils/Receiver');

  module.exports = new Receiver({
    process: 'branches.background'
  });
})