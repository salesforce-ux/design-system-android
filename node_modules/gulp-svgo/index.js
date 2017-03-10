var fs = require('fs'),
    path = require('path'),
    Stream = require('stream'),
    SVGO = require('svgo');

module.exports = function(options) {

    var stream = new Stream.Transform({objectMode: true}),
        settings = options || {},
        svgo = new SVGO(settings);

    stream._transform = function(file, encoding, next) {
        var flow = this;

        if (path.extname(file.path).toLowerCase() !== '.svg' || !file.contents.toString('utf8')) {
            flow.push(file);
            return next();
        }

        if (file.isStream()) {
            flow.push(file);
            return next();
        }

        if (file.isBuffer()) {
            svgo.optimize(file.contents.toString('utf8'), function(result) {
                file.contents = new Buffer(result.data);
                flow.push(file);
                return next();
            });
        }
    };

    return stream;
};
