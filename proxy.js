#!/usr/bin/env node
'use strict';

var https = require('https');
var fs = require('fs');
var proxy = require('http-proxy').createProxyServer();
var ports = {
  backend: 4242,
  frontend: 4243
};
var certDir = '/etc/letsencrypt/live/knilxof.org/';

https.createServer({
  key: fs.readFileSync(certDir + 'privkey.pem'),
  cert: fs.readFileSync(certDir + 'cert.pem'),
  ca: fs.readFileSync(certDir + 'chain.pem')
}, (req, res) => {
  proxy.web(req, res, { target: `http://localhost:${ports.backend}` });
}).listen(ports.frontend);
