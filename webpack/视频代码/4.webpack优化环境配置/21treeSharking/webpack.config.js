const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';
/**
 * tree shaking  去除无用代码
 * 前提： 必须使用es6模块化  开启production
 * 
 * 
 * 在package.json中配置
 * "sideEffects": false 所有代码没有副作用（都可以进行tree shaking）
 * 问题是 可能会把css 、 @babel/polyfill （副作用）文件干掉
 * 
 * "sideEffects": ["*.css"]
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
    new optimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'production',
  devtool: 'source-map',
}