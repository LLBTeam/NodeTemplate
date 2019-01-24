var express = require('express');

const usersRouter = require('./UserRouter');

var router = express.Router();

router.use('/user', usersRouter);

module.exports = router