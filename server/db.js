const mysql = require("mysql")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"inventory_management"
})

db.connect((err)=>{
    if(err){
        console.log(err)
        console.log("No nos pudimos conectar a la base de datos")
        return;
    }
    console.log("Connected to Mysql");
})

module.exports = db
