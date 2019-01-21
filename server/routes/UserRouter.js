var express = require('express');
var router = express.Router();
var userDao = require('../dao/UserDao');

//按照id来查询某条数据库某条信息
router.get('/query/:id', async (req, res, next) => {
  let [results] = await userDao.queryById(req.params.id);
  if(results.length == 0){
    res.fail('未找到相应数据');
  } else {
    res.success(results[0]);
  }
});

//添加到数据库
router.post('/create', async (req, res, next) => {
  let [result] = await userDao.create(req.body);
  res.success(result.insertId);
});

//按照id来删除某条数据
router.post('/deleteUser/:id', async (req, res, next) => {
  let [result] = await userDao.delete(req.params.id);
  res.success(result);
});

//更新某条数据
router.delete('/updateUser', async (req, res, next) => {
  let [result] = await userDao.update(req.body);
  res.success(result);
});

//查询数据库所有数据
router.get('/queryAll', async (req, res, next) => {
  let [result] = await userDao.queryAll();
  res.success(result);
});

//查询数据库所有数据
router.post('/createWithTransaction',  wrapFn ( async ( req, res, next) => {
  let result = await userDao.createWithTransaction(req.body);
  res.success(result);
}));

module.exports = router;
