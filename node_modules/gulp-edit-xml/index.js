var Stream = require('stream'),
    xml2js = require('xml2js'),
    isFunction = require('lodash.isfunction'),
    isObject = require('lodash.isobject'),
    assign = require("object-assign"),
    gutil = require('gulp-util');

var xmlEdit = function(transform, options){

    if(!isFunction(transform)){
        transform = function(data){
            return data;
        };
    }

    var defaults = {
        parserOptions: {},
        builderOptions: {
            headless:true,
            renderOpts:{
                pretty: false
            }
        }
    }

    var settings = assign(defaults, options);

    var stream = new Stream.Transform({ objectMode: true });

    stream._transform = function(file, unused, done){

        var that = this;

        if (file.isNull()) {
            return done(null, file);
        }

        if (file.isStream()) {
          return done(new gutil.PluginError('gulp-xml-edit', 'Streaming not supported'));
        }


        var content = file.contents.toString('utf-8'),
            parser = new xml2js.Parser(settings.parserOptions),
            builder = new xml2js.Builder(settings.builderOptions);

        parser.parseString(content, function(err,data){
            var content = transform.call(null, data);
            if(!isObject(content)){
                done(new gutil.PluginError('gulp-xml-edit', 'transformation does not returns an object'));
                return;
            }
            content = builder.buildObject(content);
            file.contents = new Buffer(content);
            return done(null, file);
        });
    };

    return stream;
}

module.exports = xmlEdit;
