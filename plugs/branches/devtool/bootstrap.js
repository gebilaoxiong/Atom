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

    preload: ['seajs-text'],

    paths: {
      'libs': 'libs',

      'utils': seajs.resolve('../../utils')
        .replace(/\.js/,''),

      /*基础设施层*/
      'infrastructure': seajs.resolve('../../infrastructure/devtools')
        .replace(/\.js/,''),

      /*项目通用层*/
      'common': 'common'
    },

    /*别名*/
    alias: {

      'seajs-text': '../../bower_components/seajs-text/dist/seajs-text',

      /*路由器实例*/
      'router': 'router'

    }
  });

  //启动
  seajs.use(['application']);

}();
