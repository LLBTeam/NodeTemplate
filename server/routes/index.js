var express = require('express');

const usersRouter = require('./UserRouter');
const guessLanternRiddlesRouter = require('./GuessLanternRiddlesRouter');

var router = express.Router();

router.use('/user', usersRouter);
router.use('/guessLanternRiddles', guessLanternRiddlesRouter);

module.exports = router