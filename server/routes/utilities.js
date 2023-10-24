const express = require("express");
const router = express.Router();
const db = require("../db.js");


router.get("/",(req, res)=>{
    db.query("SELECT paramtype_id, name, id FROM params WHERE paramtype_id = 204 OR paramtype_id = 203 OR paramtype_id = 208 OR paramtype_id = 201 AND param_state=1 ",(error, result)=>{
        res.send(result)
    })

})
module.exports = router
