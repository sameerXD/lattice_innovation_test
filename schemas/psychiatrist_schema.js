const joi = require("joi");
const { joiPassword } = require('joi-password');

const registratioValidation = joi.object({
     first_name: joi.string().alphanum().min(2).max(20).trim(true).required(),
     last_name: joi.string().alphanum().min(2).max(20).trim(true).required(),
     email: joi.string().email().trim(true).required(),
     password: joiPassword
     .string()
     .min(8)
     .max(15)
     .minOfLowercase(1)
     .minOfUppercase(1)
     .minOfNumeric(1)
     .noWhiteSpaces()
     .required(),
     phone_number: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
     pincode: joi.string().min(6).max(10),
     hospital_name:joi.string(),
     state:joi.string()
});

const loginValidation = joi.object({
    email:joi.string().email().trim(true).required(),
    password:joi.string().min(8).max(15).required()
})
module.exports={
    registratioValidation,
    loginValidation 
}