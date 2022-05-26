const express = require("express");
const app = express();

const db = require('./db/db_connect');

// use req.body==>parsse req.body as json
app.use(express.json());


const utils =require("./utils/utils");
// all the migration required by the server
app.get("/migrations", async (req,res)=>{
  let sql ={
    "Psychiatrist":"CREATE TABLE Psychiatrist(id int AUTO_INCREMENT, email VARCHAR(255) UNIQUE, first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20) NOT NULL , hospital_name VARCHAR(255) NOT NULL, phone_number varchar(15), password varchar(15) NOT NULL, pincode varchar(15), state varchar(255), PRIMARY KEY(id))",
    "Hospitals":"CREATE TABLE Hospitals(id int AUTO_INCREMENT, hospital_name VARCHAR(255), PRIMARY KEY(id))",
    "Patients":"CREATE TABLE Patients(id int AUTO_INCREMENT, name VARCHAR(255) NOT NULL , address VARCHAR(255) NOT NULL , email VARCHAR(255) NOT NULL, phone_number varchar(15), password varchar(15) NOT NULL, patient_photo varchar(255) NOT NULL, assigned_to int NOT NULL, PRIMARY KEY(id))",
    "ADD_HOSPITALS":"INSERT INTO Hospitals VALUES (1,'Apollo Hospitals'),(2,'Jawaharlal Nehru Medical College and Hospital'),(3,'Indira Gandhi Institute of Medical Sciences (IGIMS'),(4,'AIIMS - All India Institute Of Medical Science')"
  };
  
  var queryMessage = [];

  for(const [table, query] of Object.entries(sql)){
    queryMessage.push(await migrate(table,query));
  };

  async function migrate(table,q){
    try{

      let result = await db.execute(q);
      return`${table} table created`;
    }catch (err){
      console.log(err);
      return `${table} table was already created`;
      
    }
  };

  utils.sendResponse(req,res,true, queryMessage, {},'');

});

app.use("/api/Psychiatrist", require("./routes/api/Psychiatrist"));

/**
 * error handling for page not found 404
 */
 app.use((req,res,next)=>{
	const err = new Error('Route Not Found');
	res.status(404).json({
		success:false,
		message:err.message
	});
})


app.listen("3000",()=>{
    console.log("listening to port 3000");
})