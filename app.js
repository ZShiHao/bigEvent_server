// express框架
const express=require('express');
const db=require('./db/index');
const Joi=require('joi');
// 跨域
const cors=require('cors');
const userRouter=require('./router/user');

const url='http://127.0.0.1'
const app=express();


// 测试数据库是否连接成功
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
 if (error) throw error;
 console.log('The solution is: ', results[0].solution);
});

// 注册cors全局中间件
app.use(cors());
// 解析请求体
app.use(express.urlencoded({extended:false}));

// 处理响应处理失败结果的中间件
app.use(function(req,res,next){
 // 为res响应对象挂载一个处理函数
 res.errHandler=(err,status=1)=>{
  res.send({
   status,
   message:err instanceof Error?err.message:err
  })
 }
 next();
})

// 注册路由
app.use('/api',userRouter);

// 错误中间件,处理抛出的错误
app.use(function(err,req,res,next){
 // 判断错误是否是表单验证出错
 if(err instanceof Joi.ValidationError) {
  return res.errHandler(err);
 }
 // 未知错误
 res.send(err);
})

app.listen(80,()=>{
 console.log(`api server running at ${url}`);
})