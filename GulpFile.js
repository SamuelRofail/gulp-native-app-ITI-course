const { src, dest } = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const primaryHtmlStyling = require("gulp-html-minifier-terser");
const cleanCss = require("gulp-clean-css");
const images = require("gulp-optimize-images");

//image optimization
function optimizeImage() {
  return src("manifest/*.png")
    .pipe(
      images({
        compressOptions: {
          jpeg: { compressionLevel: 7 },
        },
      })
    )
    .pipe(dest("dist/images"));
}
exports.imageOptimization = optimizeImage;


//Javascript task
function javascriptTask() {
  return src("js/*.js")
    .pipe(concat("allJavascriptFiles.min.js"))
    .pipe(terser())
    .pipe(dest("dist/js"));
}
exports.minifiedJavascript = javascriptTask;

//html gulp
function htmlTask() {
  return src("*.html")
    .pipe(
      primaryHtmlStyling({ collapseWhitespace: true, removeComments: true })
    )
    .pipe(dest("dist/html"));
}
exports.html = htmlTask;

//css gulp
function cssTask() {
  return src("styles/*.css")
    .pipe(concat("allCssFiles.min.css"))
    .pipe(cleanCss())
    .pipe(dest("dist/css"));
}
exports.cssMinifiedFiles = cssTask;
