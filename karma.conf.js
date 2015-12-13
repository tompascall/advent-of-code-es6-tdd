module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      'test/index.js'
    ],
    frameworks: ['mocha', 'chai', 'sinon'],
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      resolve: {
        extensions: ['', '.js']
      },
      devtool: 'inline-source-map',
      module: {
       loaders: [
        {
          test: /\.js$/,
          exclude: /(bower_components|node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
       ]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
