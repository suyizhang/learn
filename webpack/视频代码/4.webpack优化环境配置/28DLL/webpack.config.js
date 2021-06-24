const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    // 告诉webpack 不用打包manifest中的文件
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
      context: join(__dirname),
    }),

    // 将文件打包到html
    new AddAssetHtmlWebpackPlugin(
      { filepath: resolve(__dirname, 'dll/*.js'), publicPath: 'dll', outputPath: 'dll' }
      ),
  ],
  mode: 'production',
}