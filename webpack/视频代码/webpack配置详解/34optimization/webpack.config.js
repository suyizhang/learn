const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {

  entry: {
    index: './src/index.js',
  },
  output: {
    // 文件名称 指定名称 目录  'js/[name].js'
    filename: 'js/[name].[contenthash:10].js',
    // 指定文件输出目录  （所有资源输出的目录）
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10].js',
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

  mode: 'production',
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
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      // minSize: 30* 1024, // 分割的chunk最小为30kb
      // maxSize: 0, //0是最大不做限制
      // minChunks: 1, //要提取的chunk最少被引用一次,
      // maxAsyncRequests: 5, // 按需加载并行加载的文件的最大数量
      // maxInitalRequsets: 3, // 入口js最大并行请求数量
      // automaticNameDeliniter: '~', // 名称连接符
      // name: true, // 可以使用命名规则
      // cacheGroups: { // 分割chunk的组
      //   // node_modules 中的文件会被打包到vendors组中的chunk中  ---> vendor~xxx.js
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     // 打包优先级
      //     priority: -10,
      //   },
      //   default: { // 默认分组
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true, // 如果当前要打包的模块和已经被提前的模块是同一个就回被复用
      //   }
      // }
    },
    // 将当前模块的记录其他模块的hash单独打包成一个文件 runtime

    // 不配置这个 使用contenthash 时  修改a文件时  会导致使用a的b文件也会发生变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },

    minimizer: [
      // 配置生产环境的压缩方案： js and css   ---> terser
      new TerserWebpackPlugin({
        cache: true, // 开启缓存 压缩之后走缓存
        parallel: true, // 开启多进程打包
        sourceMap: true, // 启动source map
      })
    ]

  }
}