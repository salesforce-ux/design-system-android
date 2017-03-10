[![NPM version](https://badge.fury.io/js/gulp-edit-xml.svg)](http://badge.fury.io/js/gulp-edit-xml) [![Build Status](https://travis-ci.org/vkbansal/gulp-edit-xml.svg?branch=master)](https://travis-ci.org/vkbansal/gulp-edit-xml) [![Dependencies](https://david-dm.org/vkbansal/gulp-edit-xml.png)](https://david-dm.org/vkbansal/gulp-edit-xml) [![devDependency Status](https://david-dm.org/vkbansal/gulp-edit-xml/dev-status.svg)](https://david-dm.org/vkbansal/gulp-edit-xml#info=devDependencies)
#gulp-edit-xml
A gulp plugin for editing xml files, specially svg files. It makes use of [xml2js](https://www.npmjs.org/package/xml2js). It helps in further manual optimization of a svg file even after using [svgo](https://www.npmjs.org/package/svgo).

##Install
```bash
npm install gulp-edit-xml
```
##Why I made this
Recieved a `~400KB` svg file from a client. After editing it in Inkscape and processing it with `svgo`, the file size was reduced to `~140KB`. The file contained `~1600` circle elements which had `transform` and `fill` attributes on each of it.

Editing it manually would have been a tedious task, so I put a quick script using [xml2js](https://www.npmjs.org/package/xml2js) to do the task for me. You can have a look at it [here](https://gist.github.com/vkbansal/1d2321e34feba9648589).

After removing the transforms and updating the `cx` and `cy` values, the file size was reduced to `~94KB`. After removing fill attributes also, the final size was `~74KB`, That is **47%** more than `svgo` alone.

So I made the script into a gulp plugin to integrate it in my build process.

> **Note:** This is **not a replacement** for `svgo` or `gulp-svgo`. It's a companion tool for it.

##Usage
```js
var gulp = require('gulp'),
    svgo = require('gulp-svgo'),
    xmlEdit = require('gulp-edit-xml');

gulp.task('svg', function(){
    gulp.src('src/img/main.svg')
    .pipe(svgo())
    .pipe(xmlEdit(function(xml){
        var nodes = xml.svg.g[0].circle;
        for(var i = 0 , l = nodes.length; i < l; i++){
            var cn = nodes[i].$;
            if (cn.hasOwnProperty('transform')){
                var transforms = cn.transform.match(/translate\(([\d\s\-\.]+)\)/)[1];
                transforms = transforms.split(' ');
                cn.cx = parseInt(cn.cx) + parseInt(transforms[0]);
                cn.cx = Math.round(cn.cx*10)/10;
                if (transforms.length == 2){
                    cn.cy = parseInt(cn.cy) + parseInt(transforms[1]);
                    cn.cy = Math.round(cn.cy*10)/10;
                }
                delete cn.transform;
                delete cn.fill;
            }
            nodes[i].$ = cn;
        }
        xml.svg.g[0].circle = nodes;
        return xml;
    }))
    .pipe(gulp.dest('dist/img/'))
})
```

##Options
Its takes two optional arguments:
```
xmlEdit(transform,options)
```
**transform:** A function that can be used to do manual operations. It takes one argument: The `xml` as an object. *Remember to return the object at end*.

default:
```js
function(data){
    return data;
}
```

**options:** An object with `parserOptions` and `builderOptions` as keys. These options will be passed to xml2js' Parser and Builder classes respectively. See [this for more information](https://github.com/Leonidas-from-XIV/node-xml2js#options)

default:
```js
{
    parserOptions: {},
    builderOptions: {
        headless:true,
        renderOpts:{
            pretty: false
        }
    }
}
```

###License
[MIT](LICENSE.md)
