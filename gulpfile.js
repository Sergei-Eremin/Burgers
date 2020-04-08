const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;


sass.compiler = require('node-sass');

task( 'clean', ()=> {
    console.log(env);
    return src( 'dist/**/*', { read: false })
    .pipe( rm() )
});

task( 'copy:html', ()=> {
    return src("src/*.html").pipe(dest("dist"))
    .pipe(reload({ stream: true }))
});

task( 'copy:rastersImage', ()=> {
  return src("src/image/**/*.+(jpg|jpeg|gif|png)").pipe(dest("dist/image"))
  .pipe(reload({ stream: true }))
});

task('copy:favicon', () => {
  return src('src/favicon/*').pipe(dest('dist/favicon'))
});

const necessaryStyles = [
  'node_modules/normalize.css/normalize.css',
  'src/style/main.scss',

];

task( 'style', ()=> {
  return src(necessaryStyles)
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(px2rem())
  .pipe(autoprefixer({
    cascade: false,
  }))
  .pipe(cleanCSS()) 
  .pipe(sourcemaps.write())
  .pipe(dest('dist/style'))
  .pipe(reload({stream: true}))
});

const jsLibs = [
  'node_modules/jquery/dist/jquery.js',
  'src/js/*.js',
];

task("script", () =>{
  return src(jsLibs)
  .pipe(sourcemaps.init()) 
  .pipe(concat('main.min.js', {newLine: ';'}))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js'))
  .pipe(reload({stream: true}))
});

task("svg", () =>{
  return src('src/image/**/*.svg')
  .pipe(svgo({
    plugins: [
      {
        removeAttrs: { attrs: '(fill|stroke|style|width|heigh|data.*)' }
      }
    ]
  }))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: "../sprite.svg"
      }
    }
  }))
  .pipe(dest('dist/image'))
});

task('server', ()=> {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open:false,
  })
});

watch('src/style/**/*.scss', series('style'));
watch("src/*.html", series('copy:html'));
watch("src/js/*.js", series('script'));
watch("src/image/**/*.svg", series('svg'));



task("default", series("clean", parallel("copy:html", "copy:rastersImage", "copy:favicon", "style", "script", "svg"), "server", ));