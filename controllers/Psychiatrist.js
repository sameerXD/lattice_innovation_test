const Psychiatrist_services = require("../db/services/Psychiatrist");
var utils = require("../utils/utils")


exports.create_Psychiatrist = async(req,res,next)=>{
    try{
        let data = req.body;

        let Psychiatrist_arr = [];
        
        Psychiatrist_arr.push(data.first_name, data.last_name, data.hospital_name, data.phone_number, data.password, data.pincode, data.state);
        
        let result = Psychiatrist_services.create(Psychiatrist_arr);

        return utils.sendResponse(req,res, true,"Psychiatrist inserted", {}, "");
    }catch (err){
        console.log(err);

    }

}