var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var plumber = require('gulp-plumber');
var csscomb = require('gulp-csscomb');

var settings = {
  srcMainSCSSFile: './src/scss/main.scss',
  watchSCSSPattern: 'src/scss/**/*.scss',
  dist: './public/dist/'
};

gulp.task('scss', scss);
function scss () {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
  ];

  return gulp.src(settings.srcMainSCSSFile)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write())
    .pipe(postcss(processors))
    .pipe(gulp.dest(settings.dist));
}

gulp.task('watchScss', function () {
  return gulp.watch(settings.watchSCSSPattern, function (event) {
    // Don't comb the utils
    if (event.path.indexOf('utils') === -1) {
      // [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
      // Split the filename from the path.
      var filename = event.path.split('/');
      filename = filename[filename.length - 1];
      // For some reason it does need a base to work
      var base = event.path.replace(filename, '');

      // Only comb the current file if it matches to the settings
      gulp.src(event.path, { base: base })
        .pipe(plumber())
        .pipe(csscomb())
        .pipe(gulp.dest( base ));
    }

    scss();
  });
});

gulp.task('serve', function () {
  nodemon({
    script: 'index.js',
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', ['serve', 'scss', 'watchScss']);
