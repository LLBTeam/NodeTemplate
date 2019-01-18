const config = require('./conf/server');
const usersRouter = require('./routes/users');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('server:server');
var http = require('http');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public/dist')));
app.use('/api', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var port = config.port;
app.set('port', port);
var server = http.createServer(app);

server.listen(port);
server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port; debug('Listening on ' + bind);
});

server.on('error', onError);
console.log('系统启动成功:', port)


function onError(error) {
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
