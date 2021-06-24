const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';

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
    filename: 'js/build.js',
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
        test: /\.js/,
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
              }
            ]
          ]
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
          name:'[hash:10].[ext]',
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
      filename: 'css/build.css'
    }),
    new optimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'production',
}