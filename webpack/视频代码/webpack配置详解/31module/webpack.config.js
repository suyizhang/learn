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

      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules下的js文件
        include: resolve(__dirname, 'src'), // 只检查src下面的
        // enforce 不写 中间执行
        enforce: 'pre',// 优先执行
        enforce: 'post',// 延后执行
        loader: 'eslint-loader',
        options: {
          // loader配置
        }
      },
      {
        oneOf: [
           // 以下配置只会使用一次
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: './src/index.html',
    }),
  ],

  mode: 'development',
}