"use strict";

var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var jsonlint = require("jsonlint");

var PluginError = gutil.PluginError;
var File = gutil.File;
var c = gutil.colors;

module.exports = function (fileName, converter) {
  if (!fileName) {
    throw new PluginError('gulp-jsonconcat', 'Missing fileName option for gulp-jsonconcat');
  }
  if (!converter) {
    throw new PluginError('gulp-jsonconcat', 'Missing converter option for gulp-jsonconcat');
  }

  var data = {};
  var firstFile = null;
  //We keep track of when we should skip the conversion for error cases
  var skipConversion = false;

  function bufferContents(file) {

    try {
      jsonlint.parse(String(file.contents));
    }
    catch (err) {
      gutil.log(c.yellow('Error on file ') + file.path);
      gutil.log(c.red(err.message));
      gutil.log(c.yellow('Your JSON file was not generated. Please correct your JSON file.'));
      return false;
    }

    if (!firstFile) {
      firstFile = file;
    }

    if (file.isNull()) {
      return; // ignore
    }
    if (file.isStream()) {
	  skipConversion = true;
      return this.emit('error', new PluginError('gulp-jsonconcat', 'Streaming not supported'));
    }
    try {

      // Remove subfolders name in the file.relative value
      if (file.relative.indexOf('\\') >= 0) {
        var fileFlat = path.parse(file.relative);
        var fileContent = file.contents;

        var file = new gutil.File({
          cwd: "",
          base: "",
          path: fileFlat.base,
          contents: fileContent
        })
      }

      data[file.relative.substr(0,file.relative.length-5)] = JSON.parse(file.contents.toString());

    } catch (err) {
      skipConversion = true;
      return this.emit('error',
		  new PluginError('gulp-jsonconcat', 'Error parsing JSON: ' + err + ', file: ' + file.path.slice(file.base.length)));
    }
  }

  function endStream() {
    if (firstFile && !skipConversion) {
      var joinedPath = path.join(firstFile.base, fileName);

	  try {

	    var joinedFile = new File({
          cwd: firstFile.cwd,
          base: firstFile.base,
          path: joinedPath,
          contents: converter(data)
        });
		this.emit('data', joinedFile);
	  }	catch (e) {
		return this.emit('error', new PluginError('gulp-jsonconcat', e, { showStack: true }));
	  }
    }
    this.emit('end');
  }

  return through(bufferContents, endStream);
};
