const gulp = require('gulp');
const peg = require('gulp-pegjs');
const rename = require('gulp-rename');
const insert = require('gulp-insert');
const clean = require('gulp-clean');
const concat = require('gulp-concat');

gulp.task('generate-parser', () => 
  gulp.src(['./.tmp/feel.pegjs'])
    .pipe(peg({
      trace: true,
      format: "commonjs"
    }))
    .pipe(rename({
      basename: 'feel'
    }))
    .pipe(gulp.dest('./lib/parser'))
);

gulp.task('make-initializer', () => 
  gulp.src('./lib/parser/grammar/initializer.js')
    .pipe(insert.wrap('{\n', '\n}'))
    .pipe(gulp.dest('./.tmp/'))
)

gulp.task('make-peg', () => 
  gulp.src(['./.tmp/initializer.js', './lib/parser/grammar/feel.pegjs'])
    .pipe(concat('feel.pegjs'))
    .pipe(gulp.dest('./.tmp'))
);

gulp.task('clean', () => gulp.src('./.tmp').pipe(clean()));

module.exports.build = gulp.series('make-initializer', 'make-peg', 'generate-parser', 'clean')
