// 路由处理函数模块

const db=require('../db/index');
// bcrypt密码加密
// 无法逆向解密,多次加密同一明文,加密结果不同
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('../config');


// 定义加密和解密jwt的密钥
const secretKey=config.jwtSecretKey;

// 注册路由处理函数
// 1.表单验证
// 原则:前端验证为辅,后端验证为主,后端永远不要相信前端提交回来的内容
// 2.密码加密
// 3.将用户的注册信息存入到数据库中
module.exports.regUserHandler=(req,res)=>{
 // 拿到用户提交的信息
 const userInfo=req.body

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

// 登录路由处理函数
// 1.根据用户名去查询用户的信息
// 2.判断用户输入的密码是否正确
// 3.生成JWT的token字符串,返回给客户端
module.exports.loginHandler=(req,res)=>{
 const userInfo=req.body;
 const sqlStr='select * from ev_users where username=?';
 db.query(sqlStr,[userInfo.username],(err,results)=>{
  if(err) return res.errHandler(err);
  if(results.length!=1) return res.errHandler('登录失败!');
  // TODO:登录成功,接下来验证密码
  const compareResult=bcrypt.compareSync(userInfo.password,results[0].password);
  if(!compareResult) return res.errHandler('密码错误!');
  res.send({
   status:0,
   message:'登录成功!',
   token:'Bearer '+jwt.sign({...results[0],password:'',user_pic:''},secretKey,{expiresIn:config.expireIn})
  })
 })
 // res.send('login ok');
}