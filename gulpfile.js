require('dotenv').config(); 
const gulp                  = require('gulp');
const gutil                 = require('gulp-util');
const nodemon               = require('gulp-nodemon');
const browserSync           = require('browser-sync').create();
const webpack               = require('webpack');
const webpackDevMiddleware  = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');

const webpackDevConfig            = require('./webpack/dev.js');
const webpackProdConfig           = require('./webpack/prod.js');
const webpackProdStandaloneConfig = require('./webpack/prod.standalone.js');

gulp.task('browserSync', () => {
  const devBundler = webpack(webpackDevConfig);

  return browserSync.init({
    startPath: '/',
    proxy: {
      target: 'http://localhost:1337',
      ws: true,
      middleware: [
        webpackDevMiddleware(devBundler, {
          publicPath: webpackDevConfig.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(devBundler)
      ]
    },
    open: false,
    notify: true,
    reloadDebounce: 50,
    port: process.env.SERVER_PORT,
    ghostMode: {
      clicks: false,
      forms: false
    }
  });
});

gulp.task('server', () => { 
  return nodemon({
    script: 'server.js',
    ignore: [
      'front',
      'public',
      'bower_components',
      'gulpfile.js',
      'webpack',
    ],
    env: {
      SERVER_PORT: 1337,
      SERVER_HOST: 'localhost'
    }
  }); 
});

gulp.task('watch:static', () => {
  gulp.watch([
    './public/**/*.html'  
  ]).on('change', () => browserSync.reload());
});

gulp.task('build:dev', (done) => {
  webpackDevConfig.output.path = './build';
  webpack(webpackDevConfig, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    done();
  });
});

gulp.task('build:prod', (done) => {
  webpackProdConfig.output.path = './build';
  webpack(webpackProdConfig, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    done();
  });
});

gulp.task('build:prod:standalone', (done) => {
  webpackProdStandaloneConfig.output.path = './build';
  webpack(webpackProdStandaloneConfig, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    done();
  });
});

gulp.task('build', [ 'build:dev', 'build:prod', 'build:prod:standalone' ]);

gulp.task('default', [ 'server', 'browserSync', 'watch:static' ]);