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
    base: './devtool/js',

    debug: true,

    preload: ['queen'],

    paths: {
      'libs': 'libs',

      'utils': '../../../utils',

      /*基础设施层*/
      'infrastructure': 'infrastructure'
    },

    /*别名*/
    alias: {

      'seajs-text': 'bower_components/seajs-text/dist/seajs-text',

      /*queen*/
      'queen': 'libs/queen/queen',

      /*queen控件库*/
      'controls': 'libs/queen/controls.min'
    }
  });


  //加载Queen
  seajs.use(['queen'], function(Q) {

    /*占位图片*/
    Q.BLANK_ICON = 'style/images/queen/cleardot.gif';



  });

}();