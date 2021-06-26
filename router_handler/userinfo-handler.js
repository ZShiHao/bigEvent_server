const db=require('../db/index');

// 获取用户信息路由处理函数
module.exports.getUserinfoHandler=(req,res)=>{
 const sqlStr='select id,username,nickname,email,user_pic from ev_users where id=?';
 db.query(sqlStr,req.user.id,(err,results)=>{
  if(err) return res.errHandler(err);
  if(results.length!=1) return res.errHandler('获取用户信息失败!');
  res.send({
   status:0,
   message:'获取用户基本信息成功',
   data:results[0]
  });
 })
}

// 更新用户信息路由处理函数
module.exports.updateUserinfoHandle=(req,res)=>{
 // TODO:数据通过验证,将数据提交到数据库中
 const sqlStr='update ev_users set ? where id=?';
 db.query(sqlStr,[{nickname:req.body.nickname,email:req.body.email},req.body.id],(err,results)=>{
  if(err) return res.errHandler(err);
  console.log(results);
  if(results.affectedRows!=1) return res.errHandler('更新用户信息失败!');
  res.send({
   status:0,
   message:'更新信息成功!'
  })
 })
}