// const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const result = source.replace('echo', 'world');
  this.callback(null, result)
}