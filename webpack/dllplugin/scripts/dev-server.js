const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config');

const options = {
  contentBase: './static',
  hot: true,
  host: 'localhost',
  open: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});