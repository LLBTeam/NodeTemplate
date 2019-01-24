const mysql = require('mysql2')
var conf = require('../conf');
var utils = require('../util/util');
const pool = mysql.createPool(utils.extend({}, conf.mysql)).promise();

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