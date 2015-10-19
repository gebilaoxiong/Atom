define(function(require, exports, module) {

  module.exports = [
    '<div class="m-panel">',
    '  <!--header-->',
    '  <div class="m-panelHd">',
    '    <div class="title">{{title}}</div>',
    '    <span class="u-tool collapse" title="折叠/展开"></span>',
    '  </div>',
    '  <!--header end-->',

    '  <!--body-->',
    '  <div class="m-panelBd">',

    '    <div class="m-list canhover">',

    '      <!--row-->',
    '      <div class="row" v-repeat="list">',
    '        <div class="checkbox"><div class="icon"></div></div>',
    '        <div class="cell title text">{{title}}</div>',
    '        <div class="cell fit last text">',
    '          <span>共包含{{branche}}个分支</span>',
    '          <span class="description fit">{{description}}</span>',
    '          <span>{{createDate|relativetime}}</span>',
    '        </div>',
    '        <div class="tool">',
    '          <div class="u-tool mark"></div>',
    '          <div class="u-tool like"></div>',
    '          <div class="u-tool remove"></div>',
    '        </div>',
    '      </div>',
    '      <!--row end-->',

    '    </div>',

    '  </div>',
    '  <!--body end-->',

    '</div>'
  ].join('');
})
