const { src, dest, watch, series, parallel } = require('gulp'),
cssnano = require('gulp-cssnano'),
concat = require('gulp-concat'),
imagemin = require('gulp-imagemin'),
uglifyes = require('gulp-uglify-es').default,
autoprefixer = require('gulp-autoprefixer'),
livereload = require('gulp-livereload');


// Paths
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    cssPath: "src/**/*.css",
    imagePath: "src/images/*"
}

// Tasks for copying a html files and images
function html() {
    return src(files.htmlPath)
    .pipe(dest('public'))
    .pipe(livereload());
}

function image() {
        return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest('public/images'))
        .pipe(livereload());
    }
    

// Tasks for Concatenating And Minifying CSS And JavaScript Files

function js() {
    return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglifyes())
    .pipe(dest('public/js'))
    .pipe(livereload()); 
}

function css() {
        return src(files.cssPath)
        .pipe(autoprefixer())
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(dest('public/css'))
        .pipe(livereload());   
    }

    
// Watching task

function watchTask() {
    livereload.listen();
    watch([files.htmlPath, files.jsPath, files.cssPath, files.imagePath],
       parallel(html, js, css, image));
}

// Gulp basic task

exports.default = series(
    parallel(html, js, css, image),
    watchTask
);
