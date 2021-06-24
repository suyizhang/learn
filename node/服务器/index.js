var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
  var host = req.headers.host,
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('client ip:' + ip + ', host:' + host);
  console.log(req);
  delete req.headers.host;
  switch (host) {
    case 'localhost:80':
      //把请求url的host主机为www.mizuiren.com 80 端口的请求转发到http://fs.open.kugou.com去获取数据，可以理解为直接把请求地址 http://www.mizuiren.com替换成http://fs.open.kugou.com
      proxy.web(req, res, { target: 'https://blog.csdn.net/qq295445028/article/details/9700017' });
      break;
    case 'music.mizuiren.com':
      proxy.web(req, res, { target: 'http://localhost:3000' });
      break;
    default:
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.end('你访问的是代理服务器，但是代理域名规则找不到你的请求!');
  }
});
console.log('proxy listening on port 80');
server.listen(80);