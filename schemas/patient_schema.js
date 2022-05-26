const joi = require("joi");
const { joiPassword } = require('joi-password');

const registratioValidation = joi.object({
     name: joi.string().alphanum().min(2).max(20).trim(true).required(),
     address: joi.string().min(10).max(255).required(),
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
     patient_photo:joi.string(),
});

const loginValidation = joi.object({
    email:joi.string().email().trim(true).required(),
    password:joi.string().min(8).max(15).required()
})
module.exports={
    registratioValidation,
    loginValidation 
}