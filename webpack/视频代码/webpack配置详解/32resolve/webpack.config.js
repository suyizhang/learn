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
  },
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: './src/index.html',
    }),
  ],

  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置解析模块的路径别名
    alias: {
      '@': 'src',
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx'],

    // 告诉webpack 解析模块去哪个目录  默认是去node_modules
    modules: ['node_modules'],
  }
}