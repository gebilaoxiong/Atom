var gulp = require('gulp'),
  less = require('gulp-less'),
  runSequence = require('run-sequence'),
  del = require('del'),
  promise = require('promise'),
  config = {},
  output = './output';

//less config
config.less = {
  src: ['**/*.less', '!style/base/**/*.less', '!style/module/**/*', '!style/layout/**/*', '!style/unit/**/*', '!style/function/**/*', '!node_modules/**/*'],
  dest: output
};

//resource
config.resource = {
  src: ['**/*.png', '**/*.gif', '**/*.jpg', '**/font/*', '!**/sprite/*', '!output/**', '!node_modules/**/*'],
  dest: output
};

config.watch = {
  less: ['**/*.less'],
  resource: config.resource.src
}

//clean output
gulp.task('clean', function() {
  return del([output]);
});

//less->css
gulp.task('less', function() {
  var lessCfg = config.less;

  return gulp.src(lessCfg.src)
    .pipe(less())
    .pipe(gulp.dest(lessCfg.dest));
});

//resource
gulp.task('resource', function() {
  var resourceCfg = config.resource;

  return gulp.src(resourceCfg.src)
    .pipe(gulp.dest(resourceCfg.dest));
});

//watch
gulp.task('watch', function() {
  gulp.watch(config.watch.less, ['less']);
  gulp.watch(config.watch.resource, ['resource']);
});

//默认任务
gulp.task('default', ['clean'], function() {
  runSequence('less', 'resource', 'watch');
})
