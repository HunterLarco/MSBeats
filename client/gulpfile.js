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
const uglify = require('gulp-uglify');
const devScripts = require('./config/development.json').scripts.map(function (script) {
	return './src/' + script;
});

const settings = {
	srcMainScssFile: 'src/scss/main.scss',
	watchScssPattern: 'src/scss/**/*.scss',
	watchJsPattern: 'src/js/**/*.js',
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

/**
 * @param {String} path
 * @return {String} a new path
 */
function getDestination (path) {
	// [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
	// Split the filename from the path.
	const splitPath = path.split('/');
	const newPath = path.replace('src/', settings.dist).replace(splitPath[splitPath.length - 1], '');
	console.log(newPath);
	return newPath;
}

/**
 * @param {String} path
 * @return {String} a new path
 */
function getBase (path) {
	// [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
	// Split the filename from the path.
	const splitPath = path.split('/');
	const newPath = path.replace(splitPath[splitPath.length - 1], '');
	return newPath;
}

gulp.task('watchScss', function () {
	return gulp.watch(settings.watchScssPattern, function (event) {

		// Don't comb the utils
		if (event.path.indexOf('utils') === -1) {
			// Only comb the current file if it matches to the settings
			const base = getBase(event.path);
			gulp.src(event.path, { base: base })
				.pipe(plumber())
				.pipe(csscomb())
				.pipe(gulp.dest( base ));
		}

		scss();
	});
});

gulp.task('watchJs', function () {
	return gulp.watch(settings.watchJsPattern, function (event) {
		console.log('event.paths', event);
		// if (event.path.indexOf('__tests__') > -1) return;
		gulp.src(event.path)
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulp.dest(getDestination(event.path)));
	});
});

gulp.task('createDistFilesForAllJs', function () {
	return gulp.src(settings.watchJsPattern)
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
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(settings.dist));
});

gulp.task('watch', ['watchJs', 'watchScss'])
gulp.task('default', ['serve', 'createDistFilesForAllJs', 'scss', 'watch']);
gulp.task('build', ['buildJs', 'scss']);
