var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    rename = require("gulp-rename"),
    git = require('gulp-git'),
    filter = require('gulp-filter'),
    runSequence = require('run-sequence'),
    bump = require('gulp-bump'),
    gutil = require('gulp-util'),
    fs = require('fs');

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

//------------ publishing
gulp.task('bump-patch-version', function () {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type: "patch"}).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
    return gulp.src('.')
        .pipe(git.commit('Bumped version number'));
});

gulp.task('push-changes', function (cb) {
    git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function (cb) {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function (error) {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'master', {args: '--tags'}, cb);
    });

    function getPackageJsonVersion () {
        //We parse the json file instead of using require because require caches multiple calls so the version number won't be updated
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    }
});

gulp.task('release', function (callback) {
    runSequence(
        'default',
        'bump-patch-version',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});