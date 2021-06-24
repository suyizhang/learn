const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    // name 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      }
    }),
  ],
  optimization: {
    // 可以将node_module中的代码单独打包成一个chunk输出
    //可以分析多入口的chunk中 有没有公共的文件 如果有 单独打包成一个chunk
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production',
}