const express = require("express");
const router = express.Router();
const db = require("../db.js");
const multer = require("multer");
const path = require("path");
const helper = require("../lib/helpers.js")


//Get all
router.get("/", (req, res) => {
   db.query("SELECT *,  (select name from params where params.id = workers.status) as status_name FROM workers where status <> 3",(err,result)=>{
    if(err){
        console.log(err)
         return  res.status(300).send("Tuvimos un error intenta mas tarde");
    }
    if (result.length < 1) {
        return res.status(404).send("No hay colaboradores registrados");
    }
 const data = []
    result.forEach((element) => {
      element.enroll_date = helper.convertTime(element.enroll_date)
      element.created_at =   helper.convertTime(element.created_at)
      data.push(element);
    });

 
    res.send(data);
   })
})

//get one
router.get("/:id",(req,res)=>{
    db.query("SELECT *,  (select name from params where params.id = workers.status) as status_name FROM workers where id= ?",[req.params.id],(err,result)=>{
     
        if(err){
            console.log(err)
             return  res.status(300).send("Tuvimos un error intenta mas tarde");
        }
        if (result.length < 1) {
            return res.status(300).send("Ese colaborador no esta registrado");
        }
     const data = []
        result.forEach((element) => {
          element.enroll_date = helper.convertTime(element.enroll_date)
          data.push(element);
        });
    
        res.send(data);
       })
})

//create
router.post("/",(req,res)=>{
    const datos = req.body
    db.query("INSERT INTO workers SET ? ",[datos],(err,result)=>{
        if(err){
            console.log(err)
           if(err.code == "ER_DUP_ENTRY"){
             return res.status(303).send("Ese usuario ya esta registrado");
           }
             return  res.status(300).send("Tuvimos un error intenta mas tarde");
        }
       
        res.send("Colaborador guardado correctamente")

    })

})
//Edit
router.put("/:id",(req,res)=>{
    const datos = req.body
    datos.updated_at = new Date();
    const id = req.params.id
    db.query(`UPDATE workers SET ? where workers.id = ? `,[datos,id],(err,result)=>{
        if(err){
            console.log(err)
            if(err.code == "ER_DUP_ENTRY"){
                return res.status(303).send("Ese email/identificación ya esta registrado");
              }
            return  res.status(300).send("Tuvimos un error intenta mas tarde");
        }
        console.log(result)
        res.send("Usuario editado correctamente")

    })

})
//delete
router.delete("/:id",(req,res)=>{
    const id = req.params.id
    db.query(`UPDATE workers SET status = 3, email =${Date.now()}, nit=${Date.now()}  where workers.id = ? `,[id],(err,result)=>{
        if(err){
            console.log(err)
            return  res.status(300).send("Tuvimos un error intenta mas tarde");
        }
        console.log(result)
        res.send("Usuario eliminado correctamente")

    })
})

module.exports = router;