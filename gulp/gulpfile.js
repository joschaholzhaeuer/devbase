// Include Gulp
var gulp = require('gulp');

// Include Plugins
var jshint       = require('gulp-jshint');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pixrem       = require('pixrem');
var cssnano      = require('cssnano');


// Lint JS-Files
gulp.task('lint', function() {
    return gulp
        .src('../src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp
        .src('../src/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('../js/'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../js/'));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp
        .src('../src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('../css/'))
});

// Minify & Autoprefix CSS
gulp.task('css', function () {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['last 4 versions', 'android 4', 'opera 12']
        }),
        cssnano(),
    ];
    return gulp
        .src('../css/style.css')
        .pipe(postcss(processors))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('../css/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('../src/js/*.js', ['lint', 'scripts']);
    gulp.watch('../src/scss/**/*.scss', ['sass', 'css']);
});

// Default Tasks
gulp.task('default', ['lint', 'sass', 'css', 'scripts', 'watch']);