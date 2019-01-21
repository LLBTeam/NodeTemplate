var sqls = require('../sqlmapping/UserSqlMapping');

module.exports = {
  async queryAll(req, res, next) {
    let [result] = await Pool.queryWithRes([sqls.queryAll], res);
    res.success(result);
  },
  async queryById(req, res, next) {
    let result = await Pool.queryByIdWithRes([sqls.queryById, req.params.id], res);
    res.success(result);
  },
  async update(req, res, next) {
    let [results] = await conn.queryWithRes([sqls.update, req.body], res);
    res.success(results);
  },
  async delete(req, res, next) {
    let [results] = await conn.queryWithRes([sqls.delete, req.params.id], res);
    res.success(results);
  },
  async create(req, res, next) {
    let [results] = await conn.queryWithRes(sqls.insert, req.body);
    res.success(results.insertId);
  },
  async createWithTransaction(req, res, next) {
    Pool.withTransaction(async (conn) => {
      let [results] = await conn.query(sqls.insert, req.body);
      let [results2] = await conn.query(sqls.insert, req.body);
      res.success(results.insertId);
    }, res);
  },
}