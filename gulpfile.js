var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    rename = require("gulp-rename"),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version');

var paths = {
    src: ['src/*.js', '!**/*Spec.js'],
    dist: 'dist/'
};

function scriptsPipeFactory(src, dest, filename) {
    return function () {
        return gulp.src(src)
            .pipe(jshint())                           // lint out file
            .pipe(jshint.reporter('jshint-stylish'))  // output to stylish
            //.pipe(jshint.reporter('fail'))          // prevent from continuing in case of jsHint Errors
            .pipe(ngAnnotate())
            .pipe(sourcemaps.init())
            .pipe(concat(filename))
            .pipe(gulp.dest(dest))
            .pipe(rename({extname: '.min.js'}))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest));
    }
}

gulp.task('build', scriptsPipeFactory(paths.src, paths.dist, 'angular-identicon.js'));
gulp.task('test', function () {

});

gulp.task('default', ['build', 'test']);


function inc(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files
        .pipe(bump({type: importance}))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))

        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tag_version());
}

gulp.task('patch', function () {
    return inc('patch');
});
gulp.task('feature', function () {
    return inc('minor');
});
gulp.task('release', function () {
    return inc('major');
});