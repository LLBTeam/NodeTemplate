const app = require('./init/express');
global.Pool = require('./init/database');

module.exports = app;
