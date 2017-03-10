var xmlEdit = require('../index.js'),
    gutil = require('gulp-util'),
    es = require('event-stream');

describe('gulp-xml-edit', function(){

    it('should work in buffer mode', function(done){
        var stream = xmlEdit(),
            fakeBuffer = new Buffer('<svg/>'),
            fakeFile = new gutil.File({ contents: fakeBuffer });

        stream.on('data', function(file){
            expect(file.contents.toString()).toEqual(fakeBuffer.toString());
        });

        stream.on('end', function() {
            done();
        });

        stream.write(fakeFile);
        stream.end();
    });

     it('should let null files pass through', function(done) {
        var stream = xmlEdit(),

            fakeFile = new gutil.File({path: 'null.md', contents: null}),

            n = 0;

        stream.pipe(es.through(function(file) {
            expect(file.path).toBe('null.md');
            expect(file.contents).toBe(null);
            n++;
        }, function() {
            expect(n).toBe(1);
            done();
        }));

        stream.write(fakeFile);
        stream.end();
    });

    it('should transform as expected', function(done){

        var stream = xmlEdit(function(data){
                delete data.svg.g[0].circle[0].$.transform;
                return data;
            }),

            fakeBuffer = new Buffer("<svg><g><circle cx='20' cy='20' cr='20' transform='translate(20 20)'/></g></svg>"),

            fakeFile = new gutil.File({
                contents: fakeBuffer
            }),

            n = 0;

        stream.pipe(es.through(function(file) {
            expect(file.contents.toString()).toBe('<svg><g><circle cx="20" cy="20" cr="20"/></g></svg>');
            n++;
        }, function() {
            expect(n).toBe(1);
            done();
        }));

        stream.write(fakeFile);
        stream.end();

     });
});
