const path = require('path');

module.exports = (config) => {
  const webpackConfig = require('./webpack.test.js')({ env: 'test' });

  const configuration = {
    basePath: '.',
    frameworks: ['jasmine'],
    exclude: [],
    files: [
      { pattern: './src/specs.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false },
      { pattern: './public/**/*', watched: false, included: false, served: true, nocache: false }
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-spec-reporter')
    ],
    preprocessors: { './src/specs.js': ['webpack'] },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        modules: false,
        chunks: false,
        warnings: false
      }
    },
    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['Chrome'],
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    singleRun: true,
    concurrency: 1,
    browserNoActivityTimeout: 10000
  };

  config.set(configuration);
};
