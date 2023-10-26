const express = require("express");
const router = express.Router();
const db = require("../db.js");
const multer =require("multer")
const path = require("path")
const helper = require("../lib/helpers.js")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname+"/public/uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
//middlewares

router.use((req, res, next) => {
  next();
});

//Routes

//Get all
router.get("/", (req, res) => {

  try {
    
    const sql =
    "SELECT  * from events";
    db.query(sql, (err, result) => {
    if(err){console.log(err); return;}
    res.send(result);
  });
  } catch (error) {
    console.log(error)
    
  }

});
//Create event
router.post("/",upload.single("file"), (req, res) => {
  console.log(req.body);
});
//Delete equip
router.delete("/equip/:id", (req, res) => {
  try {
    const sql = `DELETE FROM equipments  WHERE equipments.id = ${req.params.id}`;
    db.query(sql, (error, result) => {
      if (result.affectedRows <= 0) {
        res.send({
          status: 404,
          message: "No se puedo eliminar el equipo, equipo no encontrado",
        });
        return;
      }
      console.log();
      res.send({ status: 204, message: "Equipo eliminado exitosamente" });
    });
    
  } catch (error) {
    console.log(error)
    
  }
 
});
//Update equip
router.put("/equip/:id", (req, res) => {

  try {
    const {
      name,
      user,
      model,
      office,
      description,
      serial,
      mark,
      equip_type,
      ram,
      formatDisk,
      formatRam,
      hard_disk,
      ram_type,
      hard_type,
      proccesor,
      system,
    status,
      antivirus,
    } = req.body;
  
    const completeRam = ram + " " + formatRam;
    const completeDisk = hard_disk + " " + formatDisk;
    const datos = {
      name,
      user,
      model,
      office,
      description,
      serial,
      mark,
      equipment_type: equip_type,
      ram: completeRam,
      hard_disk: completeDisk,
      ram_type,
      hard_type,
      proccesor,
      system,
      antivirus,
      status
    };
    const sql = `UPDATE equipments
  SET 
    name = '${datos.name}',
    user = '${datos.user}',
    model = '${datos.model}',
    office = '${datos.office}',
    description = '${datos.description}',
    mark = ${datos.mark},
    equipment_type = ${datos.equipment_type},
    ram = '${datos.ram}',
    hard_disk = '${datos.hard_disk}',
    ram_type = ${datos.ram_type},
    hard_type = ${datos.hard_type},
    proccesor = '${datos.proccesor}',
    system = '${datos.system}',
    antivirus = '${datos.antivirus}',
    status = ${datos.status},
    serial = '${datos.serial}'
  WHERE id = ${req.params.id};`;
  
    db.query(sql, (error, result) => {
      if (result.affectedRows < 1) {
        console.log(error)
        res.send({ status: 404, message: "Equipo no encontrado" });
        return;
      }
      console.log({ status: 200, message: "Equipo Actualizado correctamente" })
      res.send({ status: 200, message: "Equipo Actualizado correctamente" });
    });
  } catch (error) {
    console.log(error)
    
  }
 
});
//Get one
router.get("/equip/:id", (req, res) => {
  try {
    const sql = `SELECT equipments.*,
    (SELECT name FROM params WHERE params.id = equipments.mark) AS mark_name,
    (SELECT name FROM params WHERE params.id = equipments.equipment_type) AS equipment_type_name,
    (SELECT name FROM params WHERE params.id = equipments.ram_type) AS ram_type_name, 
    (SELECT name FROM params WHERE params.id = equipments.hard_type) AS hard_type_name 
    FROM equipments WHERE equipments.id = ${req.params.id};`;
    db.query(sql, (error, result) => {
      if (result.length <= 0) {
        res.send({ status: 404, message: "Equipo no encontrado" });
        return;
      }
      console.log("Equipo encontrado exitosamente");
      res.send(result);
    });
    
  } catch (error) {
    console.log(error)
    
  }
 
});
module.exports = router;
