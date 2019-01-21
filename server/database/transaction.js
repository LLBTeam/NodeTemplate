
const withTransaction = async function (callback, res) {
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
}

// withTransaction(async (conn) => {
//   let post  = {title: 'Hello MySQL'};
//   const [posts] = await conn.query('INSERT INTO posts SET ?', post)
//   console.log('insert post id: ' + posts.insertId)
//   let log  = {id: 4, logid: posts.insertId};
//   const [logs] = await conn.query('INSERT INTO log SET ?', log)
//   console.log('insert log id: ' + logs.insertId)
// })

module.exports = withTransaction