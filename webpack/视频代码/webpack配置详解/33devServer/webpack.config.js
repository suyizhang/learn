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
  },

  devServer: {
    contentBase: resolve(__dirname, 'build'), // 输出目录

    watchContentBase: true, // 监视contentBase下文件  文件更新就重新打包

    watchOptions: {
      ignored: /node_module/, // 忽略监视的文件
    },

    compress: true, // 启动gzip压缩

    port: 5000, // 端口号

    host: 'location', // 域名

    open: true, // 打开浏览器

    hot: true, // 热更新

    clientLogLevel: 'none', // 不需要显示启动服务器日志信息

    quiet: true, // 除了基本信息 其他内容不用打印

    overlay: false, // 如果出错 不用全屏提示
    // 服务器代理 解决开发环境跨域的代理
    proxy: {
      // devServer 接到 /api/xxx的请求就转发到另一个服务器
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { // 重写路径
          '^/api': ''
        }
      }
    }
  }
}