var activity_sqls = {
    insert: 'insert into fanstong(name,mobile,org_name,channel) values (?,?,?,?)',
    insert2: 'insert into fanstong(name,mobile,org_name,channel,identity,utm_campaign) values (?,?,?,?,?,?)',
    //10.22新增一个字段职位简称
    insert3: 'insert into fanstong(name,mobile,org_name,channel,identity,project_name) values (?,?,?,?,?,?)',
    insert4: 'insert into fanstong(name,mobile,org_name,channel,identity) values (?,?,?,?,?)',
    insert5: 'insert into fanstong(name,mobile,org_name,project_name,channel,identity,utm_campaign) values (?,?,?,?,?,?,?)',
    update: 'update fanstong set name=?,mobile=?,org_name=?,channel=? where id=?',
    delete: 'delete from fanstong where id=?',
    queryById: 'select * from fanstong where id=?',
    queryAll: 'select * from fanstong'
};

module.exports = activity_sqls;