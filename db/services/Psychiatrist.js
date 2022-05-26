const db = require("../db_connect");


const create = async(obj)=>{
    let sql = "INSERT INTO Psychiatrist SET email=?,first_name = ?,last_name=?,hospital_name=?,phone_number=?,password=?,pincode=?,state=?";
    const result = await db.execute(sql, obj);
    return result;
};

const get_by_email= async(email)=>{
    let sql = `SELECT * FROM Psychiatrist WHERE  email='`+email+`'`;
    const result = await db.execute(sql);
    return result;
}


module.exports ={
    create,
    get_by_email
}