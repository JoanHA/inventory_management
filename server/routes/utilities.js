const express = require("express");
const router = express.Router();
const db = require("../db.js");

const jwt = require("jsonwebtoken");
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


router.post("/verifyToken", async (req,res)=>{
    const {token } = req.body
    jwt.verify(token,  process.env.JWT_SECRET,(error,user)=>{
        if(error){
            res.status(500).json({status:500,error})
            console.log(error)
        }else{
            console.log(user)
            db.query(`SELECT users.*, params.name FROM users INNER JOIN params on params.id = users.rol WHERE users.id=${user.id}`,(error,row)=>{
                if(error) return console.log(error);
                const usuario ={
                    id:row[0].id,
                    username:row[0].username,
                    email:row[0].email,
                    rolName: row[0].name,
                    rol: row[0].rol
                } 
                res.status(200).json({status:200,user:usuario})
            })
         
        }
       
    })
    
})
module.exports = router
