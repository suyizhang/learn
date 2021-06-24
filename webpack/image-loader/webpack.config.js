const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 先设置为development，不压缩代码，方便调试
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  resolveLoader: {
    // 会依次在node_modules、loaders文件夹中查找是否存在对应loader
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|loaders/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              presets: ['@babel/preset-react', '@babel/preset-env'],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.(png|jpe?g)$/,
            exclude: /node_modules/,
            use: [
              'test-loader',
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[hash:16].[ext]',
                  publicPath: './',
                },
              },
              {
                loader: 'filter-loader',
                options: {
                  filter: 'groundGlass',
                },
              },
              'img-loader',
            ],
          },
          {
            test: /\.(gif|svg|png|jpe?g)(\?.*)?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[hash:16].[ext]',
                  publicPath: './',
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
          },
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   includes: /node_modules/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10000,
      //         name: 'img/[name].[hash:16].[ext]',
      //         publicPath: './',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
      inject: true,
      template: 'index.html',
    }),
  ],

  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  // },
};
