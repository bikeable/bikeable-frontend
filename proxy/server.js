var http = require('http'),
    httpProxy = require('http-proxy'),
    colors = require('colors'),
    _ = require('lodash');

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function(req, res) {
  var port = 8080;
  var acceptList = [];
  if(req.headers['accept']) acceptList = req.headers['accept'].split(',');
  if(_.contains(acceptList, 'application/json')) port = 3000;
  if(req.url.split('.')[1] == "json") port = 8080;
  if(req.url.search('\.tmpl\.html') != -1) {
    port = 8080;
  } else if (req.url.split('.')[1] == null) {
    port = 3000;
  }

  proxy.web(req, res, { target: 'http://127.0.0.1:' + port });

  var port_p = port == 8080 ? colors.gray(port) : colors.blue(port)
  console.log(port_p, colors.green(req.method), req.url);
});

console.log("listening on port 3082")
server.listen(3082);
