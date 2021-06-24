const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    index: './src/index.js',
  },
  output: {
    // 文件名称 指定名称 目录  'js/[name].js'
    filename: '[name].js',
    // 指定文件输出目录  （所有资源输出的目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引用公共路径前缀 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: '[name]_chunk.js', // 非入口chunk的名称
    // 打包成库的时候 指定library
    // library: '[name]', // 将文件暴露出去 供外部使用 整个库向外暴露的变量名
    // libraryTarget: 'window', // 将文件添加到window下 brower
    // libraryTarget: 'global', // 将文件添加到global下 node
    // libraryTarget: 'commonjs', // 将文件添加到global下 node
  },

  plugins: [
    new HtmlWebpackPlugin({
      // template: './src/index.html',
    }),
  ],

  mode: 'development',
}