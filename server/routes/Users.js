var express = require('express');
var router = express.Router();
var userDao = require('../dao/UserDao');

//按照id来查询某条数据库某条信息
router.get('/user/query/:id',function(req, res, next){
  // req.params.id
  userDao.queryById(req, res, next);
});

//添加到数据库
router.post('/user/create', function(req, res, next) {
  userDao.create(req, res, next);
});

//按照id来删除某条数据
router.post('/user/deleteUser/:id',function(req, res, next){
  // req.params.id
  userDao.delete(req, res, next);
});

//更新某条数据
router.delete('/user/updateUser',function(req, res, next){
  userDao.update(req, res, next);
});

//查询数据库所有数据
router.get('/user/queryAll',function(req, res ,next){
  userDao.queryAll(req, res, next);
});

module.exports = router;
