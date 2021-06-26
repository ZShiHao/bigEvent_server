// 用户路由模块
// 用户路由模块中只用来映射路由关系,处理函数抽离出去

const express=require('express');
const Joi=require('joi');
const schema=require('../schema/userSchema');
const userHandler=require('../router_handler/userHandler');
const router=express.Router();

/**
 * 验证数据的中间件
 * @param {Object} schema joi对象,数据的验证规则
 * @returns 返回一个验证数据规则的中间件
 */
function validatorMW(schema) {
 // 验证一个验证数据的中间件
 return (req,res,next)=>{
  // 执行验证
  const {error,value}=schema.validate(req.body);
  if(error){
   // 验证失败,抛出错误
   throw error
  }else{
   // 验证通过
   next();
  }
 }
}

// 注册新用户
router.post('/reguser',validatorMW(schema.registerSchema),userHandler.regUserHandler);

// 登录
router.post('/login',validatorMW(schema.loginScheme),userHandler.loginHandler);

module.exports=router;