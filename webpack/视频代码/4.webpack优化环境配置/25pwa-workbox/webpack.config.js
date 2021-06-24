const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
process.env.NODE_ENV = 'production';
/**
  PWA 渐进式网络开发应用程序（离线可以访问）
  workbox --> workbox-webpack-plugin
*/

const commonCSSLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              // Options
            },
          ],
        ],
      }
    }
  }
];
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/build[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_module/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre', // 优先执行
      // },
      {
        // oneOf 每种文件只会执行一个
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_module/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: 60
                    }
                  },
                ]
              ],
              // 开启babel缓存
              cacheDirectory: true,
            }
          },
          {
            test: /\.css$/,
            use: [...commonCSSLoader],
          },
          {
            test: /\.less$/,
            use: [
              ...commonCSSLoader,
              'less-loader'
            ],
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            exclude: /\.(js|jpg|png|gif|css|less|html)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/build[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),

    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1.帮助serviceworker快速启动
       * 2.删除旧的的serviceworker
       * 
       * 生成一个 serviceworker的配置文件
       */
      clientsClaim: true,
      skipWaiting: true,
    })
  ],
  mode: 'production',
  devtool: 'source-map',
}