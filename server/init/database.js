const mysql = require('mysql2')
var conf = require('../conf');
var utils = require('../util/util');
let pool = mysql.createPool(utils.extend({}, conf.mysql));
var sqlstring = require('sqlstring')

pool.config.connectionConfig.queryFormat = function (sql, values) {
  if (!values) return sql;
  if (sql.indexOf(':') == -1) {
    return sqlstring.format(sql, values, this.config.stringifyObjects, this.config.timezone);
  }
  return sql.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return sqlstring.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

pool = pool.promise();

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