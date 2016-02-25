var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    connect     = require('gulp-connect'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream');

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 8081
    });
});

gulp.task('html-dev', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('sass-dev', function() {
    gulp.src('./app/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('js-dev', function() {
    browserify('./app/my-movies.module.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.{html,js,scss}', [ 'dev' ]);
});

gulp.task('dev', [ 'html-dev', 'sass-dev', 'js-dev' ]);

gulp.task('default', [ 'dev', 'connect', 'watch' ]);

// TODO gulp.task('dist', )
// Use "dist" folder;
// Minify HTML, put in template cache;
// Build and minify SASS;
// Concat template cache with JS, minify all.
// ?? push to gh-pages?

// Other tasks.
// ?? autoprefixer
// ngAnnotate