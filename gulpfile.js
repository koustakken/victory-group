const gulp = require('gulp')
require('./gulp/docs.js')
require('./gulp/dev.js')

/**
 * Default
 */

gulp.task(
  'default',
  gulp.series(
    'clean:dev',
    gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
    gulp.parallel('server:dev', 'watch:dev'),
  ),
)

/**
 * Docs
 */

gulp.task(
  'docs',
  gulp.series(
    'clean:docs',
    gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
    gulp.parallel('server:docs'),
  ),
)
