
process.env.CHROME_BIN =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: ['tests/**/*.spec.jsx'],

    preprocessors: {
      'tests/**/*.spec.jsx': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    browsers: ['ChromeHeadless'],
    reporters: ['progress'],
    singleRun: true
  });
};
