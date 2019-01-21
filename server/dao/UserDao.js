var sqls = require('../sqlmapping/UserSqlMapping');

module.exports = {
  async queryAll(req, res, next) {
    let result = await Pool.query(sqls.queryAll);
    return result;
  },
  async queryById(id) {
    return await Pool.query(sqls.queryById, id);
  },
  async update(params) {
    return await Pool.query(sqls.update, params);
  },
  async delete(id) {
    return await Pool.query(sqls.delete, id);
  },
  async create(params) {
    return await Pool.query(sqls.insert, params);
  },
  async createWithTransaction(params) {
    return await Pool.withTransaction(async (conn) => {
      let [results] = await conn.query(sqls.insert, params);
      let [results2] = await conn.query(sqls.insert2, params);
      return results.insertId;
    });
  },
}