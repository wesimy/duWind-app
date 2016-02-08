var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var gulpDocs = require('gulp-ngdocs');

var buildDir = 'dist/';

var libJS = [
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-sanitize/angular-sanitize.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
];


var libCSS = [
    'node_modules/bootstrap/dist/css/bootstrap.css'
];


var appJS = [
    'dev/app.js',
    'dev/config.js',
    'dev/run.js',
    'dev/**/*.js',
    'dev/**/**/*.js',
    'dev/**/**/**/*.js'
];

var appLess = ['dev/*.less',
               'dev/**/*.less',
               'dev/**/**/*.less',
              ];

var appCSS = ['dev/*.css',
              'dev/**/*.css',
              'dev/**/**/*.css',
             ];


/** tasks **/
gulp.task('libJS', function () {
    var js = gulp.src(libJS);
    return js.pipe(concat('lib.js'))
        .pipe(gulp.dest(buildDir + '/js'));
});


gulp.task('libCSS', function () {
    var css = gulp.src(libCSS);
    return css.pipe(concat('lib.css'))
        .pipe(gulp.dest(buildDir + '/css'));
});


gulp.task('appJS', function () {
    var js = gulp.src(appJS);
    return js.pipe(concat('app.js'))
        .pipe(gulp.dest(buildDir + '/js'));
});

gulp.task('appLess', function () {
    return gulp.src(appLess)
        .pipe(less())
        .pipe(gulp.dest('./dev'));
});


gulp.task('appCSS', function () {
    var css = gulp.src(appCSS);
    return css.pipe(concat('app.css'))
        .pipe(gulp.dest(buildDir + '/css'));
});

gulp.task('ngdocs', [], function () {
    return gulp.src(appJS)
        .pipe(gulpDocs.process())
        .pipe(gulp.dest('./docs'));
});

/** initialize **/
gulp.task('default', function (callback) {
    //runSequence( 'libJS', 'devLess', 'mainCSS','devCSS', callback);
    runSequence('libJS', 'libCSS', 'appLess', 'appCSS', 'ngdocs', callback);
});


/** watch **/
gulp.task('watch', function () {
    gulp.watch('dev/**/*.js', ['appJS']);
    gulp.watch('dev/**/*.less', ['appLess']);
    gulp.watch('dev/**/*.css', ['appCSS']);
});