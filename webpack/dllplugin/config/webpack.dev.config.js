const { merge } = require('webpack-merge');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

process.env.CURRENT_ENV = 'development';
process.env.NODE_ENV = 'development';


const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../static'), // 设置出口文件的位置为根目录下的dist文件夹
    filename: 'js/[name].[hash].bundle.js' // 设置出口文件名称规则
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/vendor-manifest.json')
    })
  ],
  // optimization: {
  //   // Automatically split vendor and commons
  //   // https://twitter.com/wSokra/status/969633336732905474
  //   // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
  //   splitChunks: {
  //     chunks: 'all',
  //     name: false,
  //   },
  //   // Keep the runtime chunk separated to enable long term caching
  //   // https://twitter.com/wSokra/status/969679223278505985
  //   // https://github.com/facebook/create-react-app/issues/5358
  //   runtimeChunk: {
  //     name: entrypoint => `runtime-${entrypoint.name}`,
  //   },
  // },
});

module.exports = webpackProdConfig;

