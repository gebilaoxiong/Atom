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
    base: './devtool',

    debug: true,

    preload: [
      'seajs-text', 'moment'
    ],

    paths: {
      'lib': seajs.resolve('../../bower_components/'),

      'utils': seajs.resolve('../../utils/'),

      /*基础设施层*/
      'infrastructure': seajs.resolve('../../infrastructure/devtools/'),

      /*项目通用层*/
      'common': 'common',

      /*视图*/
      'view': 'view'
    },

    /*别名*/
    alias: {

      'seajs-text': '../../bower_components/seajs-text/dist/seajs-text',

      'moment': '../../bower_components/moment/moment',

      'moment-local': '../../bower_components/moment/locale/zh-cn'
    }
  });

  //启动
  seajs.use(['application']);

}();
