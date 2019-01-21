const mysql = require('mysql2')
var mysql_conf = require('../conf/db');
var activity_util = require('../util/util');
const pool = mysql.createPool(activity_util.extend({}, mysql_conf.mysql)).promise();

pool.withTransaction = async function (callback, res) {
  let conn;
  try {
    conn = await Pool.getConnection()
    await conn.beginTransaction();
    await callback(conn)
    await conn.query('COMMIT')
  } catch (err) {
    console.error(err);
    res.fail(err.message);
    if (conn) {
      await conn.rollback();
    }
  } finally {
    if (conn) {
      conn.release()
    }
  }
};
pool.queryWithRes = async (params, res) => {
  try {
    return await Pool.query(...params, res);
  } catch (err) {
    res.fail(err.message)
  }
}

pool.queryByIdWithRes = async (params, res) => {
  try {
    const [results] = await Pool.query(...params, res);
    if(results.length == 0){
      res.fail('未找到相应数据');
    } else {
      return results[0];
    }
  } catch (err) {
    res.fail(err.message)
  }
}
module.exports = pool;