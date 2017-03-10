# gulp-json-format
> A [gulp](https://github.com/gulpjs/gulp) plugin to parse and format JSON in files.

## Usage

First, install `gulp-json-format` as a development dependency:

```
npm install gulp-json-format --save-dev
```

Then, add it to your `gulpfile.js`:

```javascript
var jsonFormat = require('gulp-format-json');

gulp.src('manifest.json')
	.pipe(jsonFormat(4))
	.pipe(gulp.dest('.'));
```

## API

### jsonFormat([space])

#### space

Type: `Number` or `String`

See the space parameter for [JSON.stringify() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).