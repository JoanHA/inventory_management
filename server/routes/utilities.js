const express = require("express");
const router = express.Router();
const db = require("../db.js");


router.get("/",(req, res)=>{
    db.query("SELECT paramtype_id, name, id FROM params WHERE paramtype_id = 204 OR paramtype_id = 203 OR paramtype_id = 208 OR paramtype_id = 201 AND param_state=1 ",(error, result)=>{
        res.send(result)
    })

})


router.post("/params",(req, res)=>{
    const {paramType_Id,value }= req.body
    var idRows;
    db.query(`SELECT id FROM params WHERE paramtype_id = ${paramType_Id}`,(error,result)=>{
        idRows = result.map((ids)=>{
            return ids.id
        })
       const lastId = (idRows[idRows.length-1])
       db.query(`INSERT INTO params(paramtype_id,name,param_state,id) VALUES(${paramType_Id},'${value}',1,${lastId+1})`,(error,result)=>{
        if (error) {console.log(error); res.send(error); return;};
           res.send(result)
       })
    })
   
})



router.get("/events_type",(req,res)=>{
    db.query("SELECT id, name FROM params where paramtype_id=200",(error,result)=>{
        res.send(result)
        console.log(result)
    })
})

module.exports = router
