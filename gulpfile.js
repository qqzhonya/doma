var gulp = require('gulp'),	
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		imagemin = require('gulp-imagemin'),
		plumber = require('gulp-plumber');

var paths = {
	dirs: {
		build: './build'
	},
	html: {
		src: './src/pug/*.pug',
		dest: './build',
		watch: ['./src/pug/**/*.pug']
	},
	css: {
		src:  ['./src/style/sass/plugin/*.css', './src/style/sass/main.sass'],
		dest: './build/style/css',
		watch: ['./src/style/sass/**/*.sass']
	},
	js: {
		src: './src/style/js/**/*.js',
		dest: './build/style/js',
		watch: './src/style/js/**/*.js'
	},
	images: {
		src: './src/style/img/**/*',
		dest: './build/style/img',
		watch: ['./src/style/img/**/img/*']
	},
	fonts: {
    src: './src/style/font/**/*',
    dest: './build/style/font',
    watch: './src/style/font/**/*'
  }
};

gulp.task('templates', function () {
  return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('styles', function () {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function () {
  return gulp.src(paths.js.src)
    .pipe(plumber())
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function () {
  return gulp.src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: paths.dirs.build
    },
    reloadOnRestart: true,
  });
  gulp.watch(paths.html.watch, gulp.parallel('templates'));
  gulp.watch(paths.css.watch, gulp.parallel('styles'));
  gulp.watch(paths.js.watch, gulp.parallel('scripts'));
	gulp.watch(paths.images.watch, gulp.parallel('images'));
	gulp.watch(paths.fonts.watch, gulp.parallel('fonts'));
});


gulp.task('build', gulp.series(
  'templates',
  'styles',
  'scripts',
	'images',
	'fonts'
));

gulp.task('dev', gulp.series(
  'build', 'server'
));