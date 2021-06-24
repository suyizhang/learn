const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // test: /\.html$/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  mode: 'production',
  externals: {
    // 拒绝打包的库   忽略之后 要再html 引入改文件
    // 要忽略的库名 --- npm 包名
    jquery: 'jQuery',
  }
}