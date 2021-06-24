const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader','less-loader']
      },
      {
        exclude: /\.(css|js|html|less)/,
        loader: 'file-loader',
        options: {
          name: '[hash:12].[ext]'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],

  mode: 'development',
  
  devServer: {

    // 指令 webpack serve
    // webpack  devServer
    contentBase: resolve(__dirname, 'build'),
    // gzip
    compress: true,
    port: 300,
    open: true,
  }
}