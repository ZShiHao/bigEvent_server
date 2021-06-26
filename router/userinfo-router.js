// 用户个人中心的路由

const express=require('express');
const routerHandler=require('../router_handler/userinfo-handler');
const schema=require('../schema/userSchema');
const router=express.Router();

/**
 * 验证更新的数据
 * @param {Object} schema joi表单验证对象
 */
function validateMW(schema){
 return (req,res,next)=>{
  // 执行验证
  const {error,value}=schema.validate(req.body);
  if(error){
   throw error
  }else{
   // 通过验证
   next()
  }
 }
}

// 获取用户信息
router.get('/userinfo',routerHandler.getUserinfoHandler);

// 更新用户信息
router.post('/userinfo',validateMW(schema.updateUserinfoSchema),routerHandler.updateUserinfoHandle);

module.exports=router;
