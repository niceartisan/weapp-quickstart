import gulp from 'gulp';
import less from 'gulp-less';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import imagemin from 'gulp-imagemin';
import base64 from 'gulp-base64';

const paths = {
  src: {
    lessFiles: './src/**/*.less',
    wxssFiles: './src/**/*.wxss',
    jsFiles: './src/**/*.js',
    jsonFiles: './src/**/*.json',
    wxmlFiles: './src/**/*.wxml',
    iamgeFiles: './src/images/*',
    libsFiles: './src/libs/*'
  },
  dist: {
    baseDir: './dist',
    imageDir: './dist/images'
  }
};

export const clean = () => del([paths.dist.baseDir]);

export function imageCompile() {
  return gulp
    .src(paths.src.iamgeFiles)
    .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng()]))
    .pipe(gulp.dest(paths.dist.imageDir));
}

export function lessCompile() {
  return gulp
    .src(paths.src.lessFiles)
    .pipe(
      base64({
        extensions: ['png', 'jpg'],
        maxImageSize: 10 * 1024, // bytes,
        deleteAfterEncoding: false,
        debug: true
      })
    )
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(
      rename((path) => {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest(paths.dist.baseDir));
}

export function wxssCompile() {
  return gulp.src(paths.src.wxssFiles).pipe(gulp.dest(paths.dist.baseDir));
}

export function jsCompile() {
  return gulp.src(paths.src.jsFiles).pipe(gulp.dest(paths.dist.baseDir));
}

export function jsonCompile() {
  return gulp.src(paths.src.jsonFiles).pipe(gulp.dest(paths.dist.baseDir));
}

export function wxmlCompile() {
  return gulp.src(paths.src.wxmlFiles).pipe(gulp.dest(paths.dist.baseDir));
}

export function libsCompile() {
  return gulp.src(paths.src.libsFiles).pipe(gulp.dest(paths.dist.baseDir));
}

function watchFiles() {
  gulp.watch(paths.src.lessFiles, lessCompile);
  gulp.watch(paths.src.wxssFiles, wxssCompile);
  gulp.watch(paths.src.jsFiles, jsCompile);
  gulp.watch(paths.src.jsonFiles, jsonCompile);
  gulp.watch(paths.src.wxmlFiles, wxmlCompile);
}

const build = gulp.series(
  clean,
  gulp.parallel(imageCompile, lessCompile, wxssCompile, jsCompile, jsonCompile, wxmlCompile, libsCompile)
);

const dev = gulp.series(
  clean,
  gulp.parallel(imageCompile, lessCompile, wxssCompile, jsCompile, jsonCompile, wxmlCompile, watchFiles)
);

export { dev, build };
