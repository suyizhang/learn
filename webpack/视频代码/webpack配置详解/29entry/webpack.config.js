const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /**
   * entry:   
   * 1.string --> './src/index.js' 打包生产一个chunk 输出一个build文件 
   *    默认名称 main
   * 2.array --> [ './src/index.js', './src/add.js']  多入口
   *    所有入口最终只会形成一个chunk
   *    --> 只有在HMR功能中 让html 热更新生效
   * 3.object
   *    多入口
   *     每个入口  都会生成独立的chunk  输出独立的build
   *  此时chunk名为key
   * 
   * 
   * ---> 特殊用法
   *   entry: {
          index: [ './src/index.js', './src/count.js'],
          add: './src/add.js',
        }
   */
  // entry: [ './src/index.js', './src/add.js'] ,
  // entry: './src/index.js',
  entry: {
    index: './src/index.js',
    // add: './src/add.js',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      // template: './src/index.html',
    }),
  ],

  mode: 'development',
}