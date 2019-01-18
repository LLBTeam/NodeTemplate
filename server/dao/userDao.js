var mysql = require('mysql');
var mysql_conf = require('../conf/db');
var activity_util = require('../util/util');
var activity_sqls = require('./userSqlMapping');
var RpcClient = require('../grpc/RpcClient')

var pool = mysql.createPool(activity_util.extend({}, mysql_conf.mysql));

//像前台返回json方法
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.send({
      status: 0,
      msg: '操作失败'
    })
  } else {
    res.send(ret);
  }
};
var rpcClientAddUserAction = function (param) {
  RpcClient(param)
}

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        jsonWrite(res, undefined);
      } else {
        var param = null;
        if (JSON.stringify(req.body) === '{}') {
          if (JSON.stringify(req.params) === '{}') {
            param = req.query;
          } else {
            param = req.params;
          }
        } else {
          param = req.body;
        }
        //判断用户所填的手机号是否已存在
        connection.query(activity_sqls.queryAll, function (err, result) {
          if (err) {
            connection.release();
            return jsonWrite(res, undefined);
          }
          for (var i = 0; i < result.length; i++) {
            if (param.mobile === result[i].mobile) {
              connection.release();
              return res.send({
                status: 0,
                msg: '请勿重复提交'
              });
            }
          }
          //建立数据库连接
          if (param.identity && param.project_name && param.utm_campaign) {
            connection.query(activity_sqls.insert5, [param.name, param.mobile, param.org_name, param.project_name, param.channel, param.identity, param.utm_campaign], function (err, result) {
              if (result) {
                result = {
                  status: 1,
                  msg: '提交成功'
                }
              } else {
                result = void 0;
              }
              jsonWrite(res, result);
              connection.release();
            })
          } else if (param.identity && param.utm_campaign) {
            connection.query(activity_sqls.insert2, [param.name, param.mobile, param.org_name, param.channel, param.identity, param.utm_campaign], function (err, result) {
              if (result) {
                result = {
                  status: 1,
                  msg: '提交成功'
                }
              } else {
                result = void 0;
              }
              jsonWrite(res, result);
              connection.release();
            })
          } else if (param.identity && param.project_name) {
            connection.query(activity_sqls.insert3, [param.name, param.mobile, param.org_name, param.channel, param.identity, param.project_name], function (err, result) {
              if (result) {
                result = {
                  status: 1,
                  msg: '提交成功'
                }
              } else {
                result = void 0;
              }
              jsonWrite(res, result);
              connection.release();
            })
          } else if (param.identity) {
            connection.query(activity_sqls.insert4, [param.name, param.mobile, param.org_name, param.channel, param.identity], function (err, result) {
              if (result) {
                result = {
                  status: 1,
                  msg: '提交成功'
                }
              } else {
                result = void 0;
              }
              jsonWrite(res, result);
              connection.release();
            });
          } else {
            connection.query(activity_sqls.insert, [param.name, param.mobile, param.org_name, param.channel], function (err, result) {
              if (result) {
                result = {
                  status: 1,
                  msg: '提交成功'
                }
              } else {
                result = void 0;
              }
              jsonWrite(res, result);
              connection.release();
            });
          }
        });
      }
    })
    //grpc调用
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
    if (param.channel == 'weixin' && param.clickId && param.url) {
      rpcClientAddUserAction(param)
    }
  },
  delete: function (req, res, next) {
    //by id
    pool.getConnection(function (err, connection) {
      if (err) {
        jsonWrite(res, undefined);
        return;
      }
      var id = +req.body.id || +req.query.id;
      connection.query(activity_sqls.delete, id, function (err, result) {
        if (result.affectedRows > 0) {
          result = {
            status: 1,
            msg: '删除成功'
          }
        } else {
          result = void 0;
        }
        jsonWrite(res, result);
        connection.release();
      });
    })
  },
  update: function (req, res, next) {
    //by id
    pool.getConnection(function (err, connection) {
      if (err) {
        jsonWrite(res, undefined);
        return;
      }
      var param = null;
      if (JSON.stringify(req.body) === '{}') {
        if (JSON.stringify(req.params) === '{}') {
          param = req.query;
        } else {
          param = req.params;
        }
      } else {
        param = req.body;
      }
      if (param.id == null || param.name == null || param.mobile == null || param.org_name == null || param.channel == null) {
        jsonWrite(res, undefined);
        return;
      }
      //连接
      connection.query(activity_sqls.update, [param.name, param.mobile, param.org_name, param.channel, param.id], function (err, result) {
        if (result.affectedRows > 0) {
          result = {
            status: 1,
            msg: '更新成功'
          }
        } else {
          result = void 0;
        }
        jsonWrite(res, result);
        connection.release();
      })
    });
  },
  queryById: function (req, res, next) {
    //by id
    pool.getConnection(function (err, connection) {
      if (err) {
        jsonWrite(res, undefined);
        return;
      }
      var id = +req.body.id || +req.query.id;
      connection.query(activity_sqls.queryById, id, function (err, result) {
        if (err) {
          jsonWrite(res, undefined);
          connection.release();
          return;
        }
        jsonWrite(res, result);
        connection.release();
      })
    })
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        jsonWrite(res, undefined);
        return;
      }
      connection.query(activity_sqls.queryAll, function (err, result) {
        if (err) {
          jsonWrite(res, undefined);
          connection.release();
          return;
        }
        jsonWrite(res, result);
        connection.release();
      });
    })
  }
}