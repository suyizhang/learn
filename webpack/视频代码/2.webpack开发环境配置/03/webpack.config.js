const { resolve } = require('path');

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),

  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }
    ]
  },
  mode: 'development',
};
