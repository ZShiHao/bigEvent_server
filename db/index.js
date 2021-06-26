
const mysql=require('mysql');

// 链接数据库user_info
const db=mysql.createPool({
 host:'rm-bp128ud28xq6k4330wo.mysql.rds.aliyuncs.com',
 user:'zhang',
 password:'zQY921616699',
 database:'user_info',
})

module.exports=db;