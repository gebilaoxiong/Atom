/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-07 17:52:07
 * @description
 */
requirejs.config({

  baseUrl: 'js',

  paths: {
    /*控件库*/
    'controls': 'libs/controls.min'
  },

  shim: {
    'application': ['libs/queen'],

    'controls': ['libs/queen']
  },

  urlArgs: "_bust_=" + (new Date().valueOf())
});

define(['libs/queen'], function(Q) {

  /*占位图片*/
  Q.BLANK_ICON = 'style/images/cleardot.gif';

  //启动
  Q.ready(function() {
    //require(['application']);
  });
});