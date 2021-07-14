const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = (dir) => path.resolve(process.cwd(), dir);

process.env.CURRENT_ENV = 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/main.tsx',
  },

  output: {
    path: resolve('dist'),
    chunkFilename: `scripts/[name].[contenthash:8].min.js`,
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:8].js',
  },

  mode: 'production',

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve('src'),
      static: resolve('static'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            // options: {
            //   javascriptEnabled: true,
            // },
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif|svg|xlsx)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:16].[ext]',
          publicPath: '/',
        },
      },
    ],
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'vite+webpack+react',
      inject: true,
      template: 'index.template.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
};
