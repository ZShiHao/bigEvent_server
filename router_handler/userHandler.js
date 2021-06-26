// 路由处理函数模块

const db=require('../db/index');
// bcrypt加密
// 无法逆向解密,多次加密同一明文,加密结果不同
const bcrypt=require('bcryptjs');

// 注册路由处理函数
// 1.表单验证
// 原则:前端验证为辅,后端验证为主,后端永远不要相信前端提交回来的内容
// 2.密码加密
// 3.将用户的注册信息存入到数据库中
module.exports.regUserHandler=(req,res)=>{
 // 拿到用户提交的信息
 const userInfo=req.body
 // 对表单数据进行合法性的校验
 if(!userInfo.username||!userInfo.password){
  // 用户名和密码都不能为空
  return res.errHandler('用户名或密码不能为空!');
 }

 // 查重,检查用户名是否已经被占用
 const sqlStr='select * from ev_users where username=?';
 db.query(sqlStr,[userInfo.username],(err,results)=>{
  if(err){
   return res.errHandler(err);
  }
  // 如果查询返回的results长度大于1,证明已经存在这个用户名,用户需要重新更新用户名
  if(results.length>0) return res.errHandler('用户名已经被占用!');
 
  // TODO:用户名可以使用,可以进行后续的操作
  // 密码加密
  userInfo.password=bcrypt.hashSync(userInfo.password,10);
  // 将用户添加入数据库中
  const sqlStr='insert into ev_users set ?';
  db.query(sqlStr,{username:userInfo.username,password:userInfo.password},(err,results)=>{
   // 判断sql语句是否执行成功
   if(err) return res.errHandler(err);
   if(results.affectedRows!=1) res.errHandler('注册用户失败!');
   // 注册成功
   res.send({status:0,message:'注册成功'});
  })

 })
}

module.exports.loginHandler=(req,res)=>{
 res.send('login ok');
}