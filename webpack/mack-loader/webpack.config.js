const path = require('path')

module.exports = {
  mode: 'development', // 先设置为development，不压缩代码，方便调试
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    // 会依次在node_modules、loaders文件夹中查找是否存在对应loader
    modules: ['node_modules', path.resolve(__dirname, 'loaders')] 
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'replaceLoader.js'
      },{
        loader: 'replaceLoaderAsync.js',
        options: {
          name: 'echo'
        }
      }]
    }]
  }
}