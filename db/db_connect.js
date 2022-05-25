var db = require('mysql2-promise')();

db.configure({
    host:"localhost",
    user:"root",
    password:"password",
    database:"lattice_innovation"
});

// db.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log("mySql connected!");
// }
// );
module.exports = db;