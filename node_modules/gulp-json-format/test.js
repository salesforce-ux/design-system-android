var File = require('gulp-util').File,
	assert = require('assert'),
	jsonFormat = require('./index.js'),
	through = require('through'),
	Stream = require('stream');

var srcJson = '{"a":"b","c":[1,2,   3, 4]}';
var refJson = JSON.stringify(JSON.parse(srcJson), null, 4);

var readContent = function(file, cb) {
	var reader = through(function(data) {
		cb(data.toString());
	});
};

it('should format files with buffer content', function(done) {
	var file = new File({
		'contents': new Buffer(srcJson)
	});

	var stream = jsonFormat(4);

	stream.pipe(through(function(file) {
		file.pipe(through(function(contents) {
			assert.equal(contents.toString(), refJson);
			done();
		}));
	}));

	stream.write(file);
	stream.end();
});

it('should format files with stream content', function(done) {
	var readable = new Stream.Readable();
	readable._read = function() {
		this.push(new Buffer(srcJson));
		this.push(null);
	};

	var file = new File({
		'contents': readable
	});

	var stream = jsonFormat(4);

	stream.pipe(through(function(file) {
		file.pipe(through(function(contents) {
			assert.equal(contents.toString(), refJson);
			done();
		}));
	}));

	stream.write(file);
	stream.end();
});