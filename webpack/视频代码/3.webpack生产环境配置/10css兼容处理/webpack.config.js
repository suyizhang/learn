const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
process.env.NODE_ENV = 'development';

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将样式放入
          // 'style-loader',
          // 取代style-loader 提取css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          /*
           */
          // 'postcss-loader'
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    //   //   // "browserslist": {
                    //   //       // 默认使用production 设置  开发环境需要设置node开发环境变量 process.env.NODE_ENV
                    //   //   //   "development": [
                    //   //   //     "last 1 chrome version",
                    //   //   //     "last 1 firefox version",
                    //   //   //     "last 1 safari version"
                    //   //   //   ],
                    //   //   //   "production": [
                    //   //   //     ">0.2%",
                    //   //   //     "not dead",
                    //   //   //     "not op_mini all"
                    //   //   //   ]
                    //   //   // }
                    //   //   // 帮助postcss找到package.json中的browserslist里的配置, 通过配置加载指定的css兼容性样式
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              }
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
    }),
  ],
  mode: 'development',
}
