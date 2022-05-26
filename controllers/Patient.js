const Patient_services = require("../db/services/Patients")

var utils = require("../utils/utils")
const psychiatrist_schema = require("../schemas/psychiatrist_schema")
const security = require("../utils/security")


exports.login = async(req,res,next)=>{
    try{
        let data = req.body;
        const {error} = psychiatrist_schema.loginValidation.validate(data);

        if (error) return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, error.message);

        const get_user = await Psychiatrist_services.get_by_email(data.email)
        if (get_user[0].length==0 ) return utils.sendResponse(req,res, false,"Psychiatrist not found", {}, "email or password didnt match");

        let user=get_user[0][0]

        if(user.password.localeCompare(data.password)!=0) {
             return utils.sendResponse(req,res, false,"Psychiatrist loggedIn unSuccessful", {}, "wrong password");
        }

        const token = security.generateAuthToken(user)
        console.log(token)
        return utils.sendResponse(req,res, true,"Psychiatrist loggedIn successful", {user:"psychiatrist",access_token:token}, "");
        
    }catch(err){
        return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
}