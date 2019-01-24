const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

// router 添加拦截的处理
global.sysRouter = require('./routerHandler');

require('../util/res');
const config = require('../conf');
const routers = require('../routes/index');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public/dist')));

app.use('/api', routers);

var port = config.port;
app.set('port', port);
var server = http.createServer(app).listen(port);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err) {
    console.error(err);
  }
  res.fail(err.message, err.status || 500);
});

server.on('error', onError);
console.log('系统启动成功:', port)

function onError(error) {
  console.log(error)
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.exports = app;
