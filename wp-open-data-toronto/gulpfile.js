const gulp = require("gulp"),
    cleancss = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    babel = require('gulp-babel'),
    image = require('gulp-image');

gulp.task("minifyCSS", function () {
    return gulp.src(["*.css", "!*.min.css"])
        .pipe(cleancss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest("."));
});

gulp.task("minifyJS", function () {
    return gulp.src(["js/*.js", "!js/*.min.js"])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest("js"));
});

gulp.task("compressIMG", function () {
    return gulp.src(["img/*.png", "img/*.svg", "img/*.jpg", "img/*.jpeg"])
        .pipe(image())
        .pipe(gulp.dest("img/compressed/"));
});

gulp.task("watch:css", function () {
    gulp.watch(
        ["*.css", "!*.min.css"],
        ["minifyCSS"]);
});

gulp.task("watch:js", function () {
    gulp.watch(
        ["js/*.js", "!js/*.min.js"],
        ["minifyJS"]);
});

gulp.task("watch:img", function () {
    gulp.watch(
        ["img/*.png", "img/*.svg", "img/*.jpg", "img/*.jpeg"],
        ["compressIMG"]);
});

gulp.task("build", ["minifyCSS", "minifyJS", "compressIMG"]);

gulp.task("default", ["build", "watch:css", "watch:js", "watch:img"]);
