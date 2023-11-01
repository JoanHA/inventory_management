const express = require("express");
const router = express.Router();
const db = require("../db.js");
const multer = require("multer");
const path = require("path");
const helper = require("../lib/helpers.js");


//Storage initialization
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: function(req, file, cb){
    cb(null, Date.now() +"-"+ (file.originalname))
  }
})



//Routes

router.get("/", (req, res) => {
  try {
    const sql = `SELECT events.*,
    (SELECT name FROM params WHERE params.id = events.event_type) AS event_type_name,
    (SELECT name FROM params WHERE params.id = events.importance) AS importance_name,
    (SELECT name FROM params WHERE params.id = events.event_reason) AS reason_name,
    (SELECT name FROM equipments WHERE equipments.id = events.equip) AS equip_name
    FROM events`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//Create event
router.post("/",multer({storage}).single("file"), (req, res) => {
  const { body, file } = req;

  const {
    name,
    event_type,
    date,
    importance,
    event_reason,
    description,
    client,
    equip,
    user,
  } = body;

  const FilePath = file.filename;
  data = {
    name,
    description,
    event_type: parseInt(event_type),
    created_at: date,
    importance: parseInt(importance),
    event_reason: parseInt(event_reason),
    client,
    equip: parseInt(equip),
    status: 1,
    file:FilePath,
    created_by: parseInt(user),
  };
  console.log(data);
  db.query("INSERT INTO events SET ?", [data], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (result.affectedRows > 0) {

      //Update the user in equipments if changes
      db.query(`UPDATE equipments SET user = '${client}' WHERE equipments.id = ${equip}`)
      res.json({ status: 200, data: "Evento agregado correctamente" });
      console.log("Sent")
    }

    console.log(result);
  });

});
// //Get one
router.get("/:id", (req, res) => {
  try {
    const sql = `SELECT events.*, events.file AS adjunt ,
    (SELECT name FROM params WHERE params.id = events.event_type) AS event_type_name,
    (SELECT name FROM params WHERE params.id = events.importance) AS importance_name,
    (SELECT name FROM params WHERE params.id = events.event_reason) AS reason_name,
    (SELECT name FROM equipments WHERE equipments.id = events.equip) AS equip_name,
    (SELECT serial FROM equipments WHERE equipments.id = events.equip) AS serial,
    (SELECT   username FROM users where users.id = events.created_by) AS user,
    (SELECT   name  FROM params where params.id = events.status) AS status_name
    FROM events WHERE events.id = ${req.params.id}`;

    db.query(sql, (error, result) => {
      console.log(error)
      if (result.length <= 0) {
        res.send({ status: 404, message: "evento no encontrado" });
        return;
      }
      console.log("evento encontrado exitosamente");
      console.log(result)
      res.json(result);
    });

  } catch (error) {
    console.log(error)

  }

});


//update status in events
router.put("/:id",(req, res)=>{
  const {Status} = req.body; // Event´s 
  const {id}  = req.params // Event's id

  db.query(`UPDATE events SET status = ${Status} WHERE events.id = ${id} `,(err,result)=>{
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (result.affectedRows > 0) {
      res.json({ status: 200, data: "Evento actualizado correctamente" });
    }
  });
  
})

module.exports = router;
