/**
 * 使用dll对第三包进行淡单独打包 （Jquery react vue）
 * webpack --config webpack.dll.config.js
 */

const { resolve } = require('path');

const webpack = require('webpack');
module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery'],
    react: ['react', 'react-dom', 'react-route-dom'], // 多个库打包成一个
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库向外暴露的内容的名字
  },

  plugins: [
    // 打包生成一个manifest.json  提供一个映射关系
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库暴露的内容
      path: resolve(__dirname, 'dll/manifest.json'), // 输出库的名称
    }),
  ],
  mode: 'production',
};

