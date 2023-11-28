const express = require("express");
const router = express.Router();
const db = require("../db.js");
const multer = require("multer");
const path = require("path");
const helper = require("../lib/helpers.js");

//Storage initialization
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//Routes

router.get("/", (req, res) => {
  try {
    const sql = `SELECT events.*,
    (SELECT name FROM params WHERE params.id = events.event_type) AS event_type_name,
    (SELECT name FROM params WHERE params.id = events.importance) AS importance_name,
    (SELECT name FROM params WHERE params.id = events.event_reason) AS reason_name,
    (SELECT name FROM equipments WHERE equipments.id = events.equip) AS equip_name,
    (SELECT name FROM workers WHERE workers.id = events.client) AS user_name
    FROM events`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      const data = []
      result.forEach((element) => {
        element.created_at =   helper.convertTime(element.created_at)
        data.push(element);
      });

      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
});

//Create event
router.post("/", multer({ storage }).single("file"), (req, res) => {
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
    status
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
    status,
    file: FilePath,
    created_by: parseInt(user),
  };
  console.log(data);
  db.query("INSERT INTO events SET ?", [data], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (result.affectedRows > 0) {
      //Update the user in equipments if changes
      db.query(
        `UPDATE equipments SET user = '${client}' WHERE equipments.id = ${equip}`
      );
      res.json({ status: 200, data: "Evento agregado correctamente" });
      console.log("Sent");
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
    (SELECT username FROM users where users.id = events.created_by) AS user,
    (SELECT name  FROM params where params.id = events.status) AS status_name,
    (SELECT name FROM workers WHERE workers.id = events.client) AS user_name
    FROM events WHERE events.id = ${req.params.id}`;

    db.query(sql, (error, result) => {
      console.log(error);
      if (result.length <= 0) {
        res.send({ status: 404, message: "evento no encontrado" });
        return;
      }
      console.log("evento encontrado exitosamente");

      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//update status in events
router.put("/:id", (req, res) => {
  const { Status } = req.body; // Event´s
  const { id } = req.params; // Event's id

  db.query(
    `UPDATE events SET status = ${Status} WHERE events.id = ${id} `,
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (result.affectedRows > 0) {
        res.json({ status: 200, data: "Evento actualizado correctamente" });
      }
    }
  );
});
//traer todos los eventos de un equipo
router.get("/all/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT events.*, events.name as event_name, equipments.serial, equipments.name,
  (SELECT name FROM params WHERE params.id = events.event_type) AS event_type_name,
  (SELECT name FROM params WHERE params.id = events.importance) AS importance_name,
  (SELECT name FROM params WHERE params.id = events.status) AS status_name,
  (SELECT name FROM params WHERE params.id = events.event_reason) AS event_reason_name,
  (SELECT username FROM users WHERE users.id = events.created_by) AS created_by_name,
  (SELECT name FROM workers WHERE workers.id = events.client) AS user_name
  FROM events
  INNER JOIN equipments on equipments.id = events.equip
  WHERE events.equip = ${id};`;

  db.query(sql, (err, rows) => {
    if (err) throw new Error(err);
    console.log(rows);
    const data = [];

    rows.forEach((element) => {
      element.created_at =   helper.convertTime(element.created_at)
      data.push(element);
    });

    res.send(data);
   
  });
});

module.exports = router;
