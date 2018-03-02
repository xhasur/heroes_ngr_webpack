var webpackConfig = require('./webpack.test');

webpackConfig.module.rules.push(
  {
    test: /\.ts$/,
    enforce: 'post',
    exclude: /(node_modules)/,
    loader: 'istanbul-instrumenter-loader'
  });

module.exports = function (config) {
  var _config = {
    /* basePath: '', */
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-chrome-launcher',
    ],
    files: [
      {pattern: './config/karma-test-shim.js', watched: true}
    ],
    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    webpackServer: {
      noInfo: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    autoWatchBatchDelay: 300,
    browserNoActivityTimeout: 100000, //default 10000
    usePolling: true,
    transports: ['websocket', 'polling'],
    reporters: ['progress', 'coverage'],
    // Configuración para reporte de cobertura
    coverageReporter: {
      includeAllSources: true,
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      reporters: [
        {
          dir: 'target/coverage/',
          subdir: '.',
          type: 'cobertura'
        }, {
          dir: 'target/coverage/',
          subdir: '.',
          type: 'json'
        }
      ]
    },
  };

  config.set(_config);
};
