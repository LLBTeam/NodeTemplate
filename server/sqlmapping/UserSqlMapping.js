var activity_sqls = {
    insert: 'insert into fanstong set ?',
    insert2: 'insert into fanstong2 set ?',
    update: 'update fanstong set name = :name where id=:id',
    delete: 'delete from fanstong where id = ?',
    queryById: 'select * from fanstong where id = ?',
    queryAll: 'select * from fanstong'
};

module.exports = activity_sqls;