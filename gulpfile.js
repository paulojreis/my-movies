var gulp        = require('gulp'),
    preprocess  = require('gulp-preprocess'),
    sass        = require('gulp-sass'),
    connect     = require('gulp-connect'),
    del         = require('del'),
    browserify  = require('browserify'),
    uglify      = require('gulp-uglify'),
    ngAnnotate  = require('gulp-ng-annotate'),
    ngTplCache  = require('gulp-angular-templatecache'),
    plumber     = require('gulp-plumber'),  // Handle error unpiping, useful e.g. for not breaking watchers.
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer');

// Local HTTP server.
gulp.task('connect-dev', function () {
    connect.server({
        root: 'public',
        port: 8080
    });
});

gulp.task('connect-dist', function () {
    connect.server({
        root: 'dist',
        port: 8080
    });
});

// Clean-up.
gulp.task('clean-dev', function () {
    return del('./public');
});

gulp.task('clean-dist', function () {
    return del('./dist');
});

// HTML
gulp.task('html-dev', [ 'clean-dev' ], function () {
    return gulp.src('./app/**/*.html')
        .pipe(preprocess({context: { DEBUG: true }}))
        .pipe(gulp.dest('./public'));
});

gulp.task('html-dist', [ 'clean-dist'], function () {
    return gulp.src('./app/**/*.html')
        .pipe(preprocess({context: { DEBUG: false }}))
        .pipe(gulp.dest('./dist'));
});

// SASS
gulp.task('sass-dev', [ 'clean-dev' ], function() {
    return gulp.src('./app/sass/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass-dist', [ 'clean-dist'], function() {
    return gulp.src('./app/sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 2
        }))
        .pipe(gulp.dest('./dist/css/'));
});

// JavaScript
gulp.task('js-dev', [ 'clean-dev' ], function() {
    return browserify('./app/my-movies.module.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('js-dist', [ 'clean-dist'], function() {
    // TODO ngAnnotate.
    return browserify('./app/my-movies.module.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.{html,js,scss}', [ 'dev' ]);
});

gulp.task('dev',  [ 'html-dev', 'sass-dev', 'js-dev' ]);
gulp.task('dist', [ 'html-dist', 'sass-dist', 'js-dist' ]);

gulp.task('dist-serve', [ 'dist', 'connect-dist' ]);

gulp.task('default', [ 'dev', 'connect-dev', 'watch' ]);

// Minify HTML, put in template cache;
// Concat template cache with JS, minify all.
// ?? push to gh-pages?
// Analytics!

// Other tasks:
// ?? autoprefixer