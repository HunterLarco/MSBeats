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

function getBase (path) {
	// [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
	// Split the filename from the path.
	var filename = path.split('/');
	filename = filename[filename.length - 1];
	// For some reason it does need a base to work
	return path.replace(filename, '');
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
		gulp.src(event.path, { base: getBase(event.path) })
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulp.dest(settings.dist + 'js'));
	});
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
gulp.task('default', ['serve', 'scss', 'watch']);
gulp.task('build', ['buildJs', 'scss']);
