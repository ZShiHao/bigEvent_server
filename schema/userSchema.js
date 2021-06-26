// 定义验证规则

const Joi=require('joi');

const schema={
 // 自定义用户注册信息中数据的验证规则
 registerSchema:Joi.object({
  username:Joi.string().alphanum().min(3).max(12).required(),
  password:Joi.string().pattern(/^[\S]{6,12}$/).required(),
  repassword:Joi.ref('password')
 }),
 loginScheme:Joi.object({
  username:Joi.string().alphanum().min(3).max(12).required(),
  password:Joi.string().pattern(/^[\S]{6,12}$/).required(),
 })
}

module.exports=schema;