// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license


const gulp = require('gulp');
const gutil = require('gulp-util');
const jsonFormat = require('gulp-json-format');
const through = require('through2');
const path = require('path');
const nunjucks = require('gulp-nunjucks');
const fs = require('fs');
const merge2 = require('merge2');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const iconFont = require('gulp-iconfont');
const gulpFilter = require('gulp-filter');
const gulpData = require('gulp-data');
const consolidate = require('gulp-consolidate');
const del = require('del');
const _ = require('lodash');
const xmlEdit = require('gulp-edit-xml');
const svgo = require('gulp-svgo');
const tinycolor = require("tinycolor2");

const __PATHS__ = {
  templates: path.join(__dirname, 'templates'),
  designTokens: path.join(__dirname, 'node_modules', '@salesforce-ux', 'design-system', 'design-tokens', 'dist','force-base.ios.json'),
  iconTokens: path.join(__dirname, 'node_modules', '@salesforce-ux', 'design-system', 'design-tokens', 'dist'),
  icons: path.join(__dirname, 'node_modules', '@salesforce-ux', 'design-system', 'assets', 'icons'),
  outputAssets: path.join(__dirname, 'SalesforceDesignSystem', 'src', 'main', 'assets'),
  outputRes: path.join(__dirname, 'SalesforceDesignSystem', 'src', 'main', 'res', 'values'),
  outputSrc: path.join(__dirname, 'SalesforceDesignSystem', 'src', 'main', 'java', 'com', 'salesforce', 'designsystem'),
  temp: path.join(__dirname, 'temp')
};

let data = {};

let iconNames = [];

let types = [
  'color',
  'size',
  'font-size'
];

let iconTypes = [
  {
    'name': 'action',
    'tokenFilename': 'bg-actions.ios.json'
  },{
    'name': 'custom',
    'tokenFilename': 'bg-custom.ios.json'
  },{
    'name': 'standard',
    'tokenFilename': 'bg-standard.ios.json'
  },{
    'name': 'utility'
  }
];

const format = (s) => s[0].toUpperCase() + _.camelCase(s.substring(1));

// ------------------------------------------------------------------------------------------------ //

const parseColor = (c) => {
  let str = tinycolor(c).toHex8().toUpperCase();
  let alpha = str.substr(6);
  return '#' + alpha + str.substr(0,6);
};

// ------------------------------------------------------------------------------------------------ //

const parseDesignTokens = () =>
  through.obj((file, enc, next) => {
    let tokens = JSON.parse(file.contents.toString('utf-8'));

    types.forEach(t => {
      data[format(t)] = {};
    });

    tokens.properties.forEach(p => {
      if (p.type == 'font-size') p.type = 'size';
      let t = format(p.type)
      if (types.indexOf(p.type) !== -1) {

        if (!data[t].hasOwnProperty(format(p.category))) data[t][format(p.category)] = []

        if (p.category.indexOf('color') == -1 && p.category.indexOf('fill') == -1 )
        {
          p.value += p.category.indexOf('font-size') != -1 ? "sp" : "dp";
        }

        data[t][format(p.category)].push({
          'name' : _.snakeCase(p.name).toUpperCase(),
          'value' : p.type === 'color' ? parseColor(p.value) : p.value
        });
      }
    });
    next(null, file);
  });

// Icons
// ------------------------------------------------------------------------------------------------
let icons = {};

gulp.task('minify:svgs', () => {
  let index = 0.999
  let streams = [];

  iconTypes.forEach(t => {
    streams.push(
      gulp.src(__PATHS__.icons +  '/' + t.name + '/*.svg')
        .pipe(svgo())
        .pipe(xmlEdit((xml) => {
          if (t.name === 'action' || t.name === 'utility') {
            xml.svg.$.height = 100;
            xml.svg.$.weight = 100;
            xml.svg.$.viewBox = '0 -24 100 100';
          }
          if (xml.svg.g) {
            if(xml.svg.g[0].path) {
              xml.svg.g[0].path[0].$.d = xml.svg.g[0].path[0].$.d + ' M' + index + ' ' + index
            }
          }
          else if (xml.svg.path) xml.svg.path[0].$.d =  xml.svg.path[0].$.d + ' M' + index + ' ' + index
          index -= 0.001;
          return xml;
        }))
        .pipe(gulp.dest(__PATHS__.temp + '/minified/' + t.name))
      )
  })

  return merge2(streams)
});

// ------------------------------------------------------------------------------------------------ //

gulp.task('create:icon-fonts', () => {
  let iconPaths = []

  iconTypes.forEach(t => {
    fs.readdirSync(path.resolve(__PATHS__.temp + '/minified/' + t.name)).forEach(p => {
      iconPaths.push(__PATHS__.temp + '/minified/' + t.name + '/' + p)
    })
  })

  // add unique id to filename to avoid duplicate glyphs
  let id = 0;
  return gulp.src(iconPaths)
    .pipe(rename((path) => {
      path.basename += '-' + id++;
    }))
     .pipe(iconFont({
      fontName: 'SalesforceDesignSystemIcons',
      formats: ['ttf'],
      normalize: true
    }))
    .pipe(gulp.dest(__PATHS__.outputAssets))
});

// ------------------------------------------------------------------------------------------------ //

const parseIcons = () =>
  through.obj((file, enc, next) => {
    var count = 0;
    iconTypes.forEach(iconType => {
      icons[iconType.name] = [];

      let names = (fs.readdirSync(path.resolve(__PATHS__.icons + '/' + iconType.name))).filter(n => {
        return n.indexOf('.svg') !== -1;
      }).map(i => {
        return iconType.name === 'action' ? 'action' + format(i.replace('.svg','')) : format(i.replace('.svg','')).charAt(0).toLowerCase() + format(i.replace('.svg','')).slice(1);
      });

      let tokens = JSON.parse(file.contents.toString('utf-8'));

      names.forEach(n => {
        let backgroundColor = iconType.name === 'utility' ? 'null' : parseColor(_.find(tokens[iconType.name].properties, { 'name': n }).value)
        let name = (iconType.name === 'action' || iconType.name === 'custom') ?  format(n) : format(iconType.name) + format(n)
        iconNames.push(name);
        icons[iconType.name].push({
          'name' : name ,
          'backgroundColorName' :  _.snakeCase(name).toUpperCase(),
          'backgroundColor' : backgroundColor,
          'unicode' : (59905+count).toString(16).toUpperCase()
        });
        count++;
      });
    });
      next(null, file);
  });

// ------------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------------ //

gulp.task('template:design-tokens', () => {
  let streams = [];

  streams.push(
    gulp.src(__PATHS__.templates + '/forceBaseAndroidColor.njk')
      .pipe(nunjucks.compile({
        'data': data,
        'icons': icons }))
      .pipe(rename('force-base.android.color.xml'))
      .pipe(gulp.dest(__PATHS__.outputRes))
  );

  streams.push(
    gulp.src(__PATHS__.templates + '/forceBaseAndroidDimen.njk')
      .pipe(nunjucks.compile({ 'data': data }))
      .pipe(rename('force-base.android.dimen.xml'))
      .pipe(gulp.dest(__PATHS__.outputRes))
  );

  streams.push(
    gulp.src(__PATHS__.templates + '/IconNames.java.njk')
    .pipe(nunjucks.compile({
      'icons': icons,
      'iconTypes':iconTypes
    }))
    .pipe(rename('IconNames.java'))
    .pipe(gulp.dest(__PATHS__.outputSrc))
  );

  return merge2(streams)
});

// ------------------------------------------------------------------------------------------------ //

gulp.task('parse:icons', () =>
  gulp.src(path.resolve('./temp/icons.json'))
    .pipe(parseIcons()));

const merge = require('gulp-json-concat');

// ------------------------------------------------------------------------------------------------ //

gulp.task('merge:icon-tokens', () => {
  let basePath = path.resolve(__PATHS__.iconTokens)
  let source = iconTypes.map(t => {
    return basePath + '/' + t.tokenFilename
  });

  return gulp.src(source)
    .pipe(merge('icons.json', (data) => {
      iconTypes.forEach(t => {
        if(t.name !== 'utility') {
          data.icons
          data[t.name] = data[t.tokenFilename.replace('.json', '')]
          delete data[t.tokenFilename.replace('.json', '')]
        }
      })
        return new Buffer(JSON.stringify(data));
      }))
      .pipe(jsonFormat(2))
      .pipe(gulp.dest('./temp'))
});

// ------------------------------------------------------------------------------------------------ //

gulp.task('parse:design-tokens', () =>
  gulp.src([path.resolve(__PATHS__.designTokens)])
    .pipe(parseDesignTokens()));

gulp.task('default', () => {
  runSequence('parse:design-tokens', 'minify:svgs', 'create:icon-fonts', 'merge:icon-tokens', 'parse:icons', 'template:design-tokens', 'remove:temp')
});

gulp.task('remove:temp', () => del(__PATHS__.temp, {force:true}));

gulp.task('clean', () => del([__PATHS__.outputAssets, __PATHS__.outputRes, __PATHS__.outputSrc, __PATHS__.temp], {force:true}));
