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
  let replacedKey = [];
  return sql.replace(/\:(\w+)/g, (txt, key) => {
    if (values.hasOwnProperty(key)) {
      return sqlstring.escape(values[key]);
    }
    replacedKey.push(key);
    return txt;
  }).replace('?', () => {
    let objs = Object.keys(values).filter(item=>replacedKey.indexOf(item) == -1).map(key => {
      if (values.hasOwnProperty(key)) {
        return `${key} = ${sqlstring.escape(values[key])}`;
      }
    });
    return objs.join(' , ');
  });
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