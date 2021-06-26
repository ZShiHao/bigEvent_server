// 定义验证规则

const Joi=require('joi');

const schema={
 // 自定义用户注册信息中数据的验证规则
 registerSchema:Joi.object({
  username:Joi.string().alphanum().min(3).max(12).required(),
  password:Joi.string().pattern(/^[\S]{6,12}$/).required(),
  repassword:Joi.ref('password')
 }),
 loginSchema:Joi.object({
  username:Joi.string().alphanum().min(3).max(12).required(),
  password:Joi.string().pattern(/^[\S]{6,12}$/).required(),
 }),
 updateUserinfoSchema:Joi.object({
  id:Joi.number().integer().min(1).required(),
  nickname:Joi.string().alphanum().min(1).max(12),
  email:Joi.string().email().required()
 })
}

module.exports=schema;