# gulp-svgo
Optimizing SVG vector graphics files with Gulp

A thin wrapper around [svgo](https://www.npmjs.com/package/svgo) for Gulp. Will pass-through any non-svg files unaltered so you can use in conjuction with other image optimzation tools if you don't want a separate task for different file formats.

## Install

```
$ npm install --save-dev gulp-svgo
```


## Usage

```js
var gulp = require('gulp'),
    svgo = require('gulp-svgo');

gulp.task('default', function() {

    gulp.src('src/img/*')
        .pipe(svgo())
        .pipe(gulp.dest('dest/img'));
});
```


## Options

Options are passed directly to [svgo](https://www.npmjs.com/package/svgo) instance.
