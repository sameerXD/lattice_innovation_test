const db = require("../db_connect");


const create = async(obj)=>{
    let sql = "INSERT INTO Psychiatrist SET first_name = ?,last_name=?,hospital_name=?,phone_number=?,password=?,pincode=?,state=?";
    const result = await db.execute(sql, obj);
    return result;
};


module.exports ={
    create
}