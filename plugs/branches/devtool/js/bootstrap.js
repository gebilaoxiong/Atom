/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-08 18:04:49
 * @description   启动文件
 */
// 将标签页标识符发送至后台网页
! function() {

  //配置require.js
  seajs.config({
    base: 'devtool/js',
    
    debug: true,

    preload: ['queen'],

    paths: {
      'libs':'libs',

      /*queen*/
      'queen':'libs/queen/queen',

      /*queen控件库*/
      'controls': 'libs/queen/controls.min',

      'utils':'../../../utils',

      /*基础设施层*/
      'infrastructure': 'infrastructure'
    }
  });

  //加载Queen
  define(['queen'], function(Q) {

    /*占位图片*/
    Q.BLANK_ICON = 'style/images/queen/cleardot.gif';

  
  });

}();