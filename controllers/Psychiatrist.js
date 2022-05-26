const Psychiatrist_services = require("../db/services/Psychiatrist");
const Patient_services = require("../db/services/Patients")

var utils = require("../utils/utils")
const psychiatrist_schema = require("../schemas/psychiatrist_schema")
const patient_schema = require("../schemas/patient_schema")

const security = require("../utils/security")
exports.create_Psychiatrist = async(req,res,next)=>{
    try{
        let data = req.body;
        const { error } = psychiatrist_schema.registratioValidation.validate(data);

        if (error){
            return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, error.message);
        }

        let Psychiatrist_arr = [];
        
        const get_user = await Psychiatrist_services.get_by_email(data.email);
        console.log(get_user[0].length);
        if (get_user[0].length>0 ) return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, "email has to be unique");

        Psychiatrist_arr.push(data.email, data.first_name, data.last_name, data.hospital_name, data.phone_number, data.password, data.pincode, data.state);
        
        let result = await Psychiatrist_services.create(Psychiatrist_arr);

        return utils.sendResponse(req,res, true,"Psychiatrist inserted", {}, "");
    }catch (err){
        // console.log(Object.keys(err));
        // console.log(err);
        return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, JSON.stringify(err, Object.getOwnPropertyNames(err)));

    }

}

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

exports.create_Patient = async(req,res,next)=>{
    try{
        let data = req.body;
        const { error } = patient_schema.registratioValidation.validate(data);

        if (error){
            return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, error.message);
        }

        let Patient_arr = [];
        
        const get_user = await Patient_services.get_by_email(data.email);
        console.log(get_user[0].length);
        if (get_user[0].length>0 ) return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, "email has to be unique");

        Patient_arr.push(data.name, data.address, data.email, data.phone_number, data.password, data.patient_photo, req.user._id);
        
        let result = await Patient_services.create(Patient_arr);

        return utils.sendResponse(req,res, true,"Psychiatrist inserted", {}, "");
    }catch (err){
        // console.log(Object.keys(err));
        // console.log(err);
        return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, JSON.stringify(err, Object.getOwnPropertyNames(err)));

    }

}

exports.get_assigned_patients = async (req,res,next)=>{
    try{
        let get_patients = await Patient_services.get_by_assigned_to(req.user._id)
        get_patients = get_patients[0]
        return utils.sendResponse(req,res, true,"patients list", get_patients, "");

    }catch (err){
        console.log(err)
        return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
}

exports.get_assigned_patients_count = async (req,res,next)=>{
    try{
        let get_patients = await Patient_services.get_patients_hospital_psychiatrist(req.user._id)
        let psychiatrist = await Psychiatrist_services.get_by_email(req.user._email)
        get_patients = get_patients[0][0]
        psychiatrist = psychiatrist[0][0]
        console.log(get_patients, psychiatrist)
        return utils.sendResponse(req,res, true,"patients list", {patient_count :get_patients.patient_count, hospital_name: psychiatrist.hospital_name,psychiatrist_name:psychiatrist.first_name}, "");

    }catch (err){
        console.log(err)
        return utils.sendResponse(req,res, false,"Psychiatrist not inserted", {}, JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
}