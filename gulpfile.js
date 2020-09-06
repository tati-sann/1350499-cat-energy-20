const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlreplace = require("gulp-html-replace");
const minify = require("gulp-minifier");
const tildeImporter = require("node-sass-tilde-importer");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({
      importer: tildeImporter
    }))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

//HTML
const html = () => {
  return gulp.src("source/*.html")
  .pipe(plumber())
  .pipe(htmlreplace({
    "css": "css/style.min.css",
    "js": "js/script.min.js"
  }))
  .pipe(minify({
    minify: true,
    minifyHTML: {
      collapseWhitespace: true,
      conservativeCollapse: true,
    }
  }))
  .pipe(gulp.dest("build/"))
  .pipe(sync.stream());
};

exports.html = html;

//JS
const js = () => {
  return gulp.src("source/js/script.js")
    .pipe(plumber())
    .pipe(minify({
      minify: true,
      minifyJS: {
        sourceMap: true
      }
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
};

exports.js = js;

//Images
const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"))
}

exports.images = images;

//Webp
const Webp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
}

exports.Webp = Webp;

//Sprite
const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"))
}

exports.sprite = sprite;

//Copy

const copy = () => {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**/*",
  "source/css/**/*",
  "source/js/**/*",
  "source/*.ico"
], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
};

  exports.copy = copy;

//Delete

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js").on("change", sync.reload);
  gulp.watch("source/*.html").on("change", sync.reload);
}

const build = gulp.series (
  clean, images, Webp, sprite, copy, styles, js, html
);

exports.build = build;

exports.default = gulp.series(
  build, server, watcher
);
