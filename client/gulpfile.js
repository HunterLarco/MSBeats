const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const csscomb = require('gulp-csscomb');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const devScripts = require('./config/development.json').scripts;

const settings = {
	srcMainScssFile: 'src/scss/main.scss',
	watchScssPattern: 'src/scss/**/*.scss',
	watchJsPattern: ['src/js/*.js', 'src/js/**/*.js'],
	dist: 'public/dist/'
};

gulp.task('scss', scss);
function scss () {
	const processors = [
		autoprefixer({browsers: ['last 1 version']}),
	];

	return gulp.src(settings.srcMainScssFile)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(settings.dist));
}

gulp.task('watchScss', function () {
	return gulp.watch(settings.watchScssPattern, function (event) {

		// Don't comb the utils
		if (event.path.indexOf('utils') === -1) {
			// [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
			// Split the filename from the path.
			var filename = event.path.split('/');
			filename = filename[filename.length - 1];
			// For some reason it does need a base to work
			const base = event.path.replace(filename, '');

			// Only comb the current file if it matches to the settings
			gulp.src(event.path, { base: base })
				.pipe(plumber())
				.pipe(csscomb())
				.pipe(gulp.dest( base ));
		}

		scss();
	});
});

gulp.task('watchJs', function () {
	return gulp.watch(settings.watchJsPattern)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(settings.dist + 'js'));
});

gulp.task('serve', function () {
	nodemon({
		script: 'index.js',
		env: { 'NODE_ENV': 'development' }
	})
});

gulp.task('buildJs', function () {
	return gulp.src(devScripts)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(settings.dist));
});

gulp.task('default', ['serve', 'scss', 'watchJs', 'watchScss']);
gulp.task('build', ['buildJs', 'scss']);
