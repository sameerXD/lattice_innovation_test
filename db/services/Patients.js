const db = require("../db_connect");



const create = async(obj)=>{
    let sql = "INSERT INTO Patients SET name=?,address = ?,email=?,phone_number=?,password=?,patient_photo=?,assigned_to=?";
    const result = await db.execute(sql, obj);
    return result;
};

const get_by_email= async(email)=>{
    let sql = `SELECT * FROM Patients WHERE  email='`+email+`'`;
    const result = await db.execute(sql);
    return result;
}

const get_by_assigned_to= async(assigned_to)=>{
    let sql = `SELECT id, name, email , address, phone_number FROM Patients WHERE  assigned_to=` + assigned_to;
    const result = await db.execute(sql);
    return result;
}

const get_patients_hospital_psychiatrist=async (assigned_to)=>{
    let sql = `SELECT COUNT(*) as patient_count FROM Patients WHERE  assigned_to=` + assigned_to;
    const result = await db.execute(sql);
    return result;
}


module.exports ={
    create,
    get_by_email,
    get_by_assigned_to,
    get_patients_hospital_psychiatrist
}