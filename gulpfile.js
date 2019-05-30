const gulp = require('gulp');
const peg = require('gulp-pegjs');
const rename = require('gulp-rename');

gulp.task('generate-parser', () => 
  gulp.src(['./src/parser/grammar/feel.pegjs'])
    .pipe(peg({
      trace: true,
      format: "commonjs"
    }))
    .pipe(rename({
      basename: 'feel'
    }))
    .pipe(gulp.dest('./src/parser'))
);

