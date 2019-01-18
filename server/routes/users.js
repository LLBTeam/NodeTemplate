var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

//添加到数据库
router.use('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});

//按照id来删除某条数据
router.use('/deleteUser',function(req, res, next){
  userDao.delete(req, res, next);
});

//更新某条数据
router.use('/updateUser',function(req, res, next){
  userDao.update(req, res, next);
});

//查询数据库所有数据
router.use('/queryAll',function(req, res ,next){
  userDao.queryAll(req, res, next);
});

//按照id来查询某条数据库某条信息
router.use('/queryById',function(req, res, next){
  userDao.queryById(req, res, next);
});

module.exports = router;
