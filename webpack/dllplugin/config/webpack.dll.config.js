const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, '../static/js'),
    library: '[name]_[hash]',
  },
  plugins: [
    // 删除指定文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, '../static/vendor-manifest.json'),
        path.resolve(__dirname, '../static/js/vendor.dll.js')
      ]
    }),
    new webpack.DllPlugin({
      // DllPlugin的name属性需要和libary保持一致
      name: '[name]_[hash]',
      path: path.join(__dirname, '../static', '[name]-manifest.json'),
      // context需要和webpack.config.js保持一致
      context: __dirname,
    }),
  ]
}