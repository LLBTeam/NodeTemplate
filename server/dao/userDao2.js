const mysql = require('mysql2')
var mysql_conf = require('../conf/db');
var activity_util = require('../util/util');
var activity_sqls = require('./userSqlMapping');
const pool = mysql.createPool(activity_util.extend({}, mysql_conf.mysql));
const promisePool = pool.promise();



const JsonWrite = (res, ret, msg) => {
  if(typeof(ret) === 'undefined') {
    res.send({
      code: 0, 
      msg: msg
    })
  }else {
    res.send({
      code: 1,
      body: ret,
      msg: msg
    })
  }
}

const getParams = (req) => {
  let param = null;
  if (JSON.stringify(req.body) === '{}') {
    if (JSON.stringify(req.params) === '{}') {
      param = req.query;
    } else {
      param = req.params;
    }
  } else {
    param = req.body;
  }
  return param
}
module.exports = {
  select: async (req, res, next) => {
    let [rows, fields] = await promisePool.query(activity_sqls.queryAll);
    JsonWrite(res, rows, '操作成功')
  },
  queryById: (req, res, next) => {
    let param = getParams(req);
    let [rows, fields] = await promisePool.query(aactivity_sqls.queryById, param.id);
    JsonWrite(res, rows, '操作成功')
  }
}

select();