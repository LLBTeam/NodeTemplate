const mysql = require('mysql2')
var mysql_conf = require('../conf/conf');
var activity_util = require('../util/util');
const pool = mysql.createPool(activity_util.extend({}, mysql_conf.mysql)).promise();

pool.withTransaction = async function (callback) {
  let conn;
  try {
    conn = await Pool.getConnection()
    await conn.beginTransaction();
    let result = await callback(conn)
    await conn.query('COMMIT');
    return result;
  } catch (err) {
    if (conn) {
      await conn.rollback();
    }
    throw Error(err)
  } finally {
    if (conn) {
      conn.release()
    }
  }
};
module.exports = pool;