const express = require("express");
const router = express.Router();
const db = require("../db.js");
//middlewares

router.use((req, res, next) => {
  next();
});

//Routes

//Get all
router.get("/equip", (req, res) => {

  try {
    const sql =
    "SELECT equipments.*, params.name as paramName,(SELECT name from params where params.id = equipments.status) AS statusName FROM equipments INNER JOIN params on params.id = equipments.mark WHERE equipments.status <> 3";
  db.query(sql, (err, result) => {
    
    res.send(result);
  });
  } catch (error) {
    console.log(error)
    
  }

});
//Create equip
router.post("/equip", (req, res) => {
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
  db.query(
    `INSERT INTO equipments(name,user,model,office,description,serial,mark,equipment_type,ram,hard_disk,ram_type,hard_type,proccesor,system,antivirus,status) VALUES('${datos.name}','${datos.user}','${datos.model}','${datos.office}','${datos.description}','${datos.serial}',${datos.mark},${datos.equipment_type},'${datos.ram}','${datos.hard_disk}',${datos.ram_type},${datos.hard_type},'${datos.proccesor}','${datos.system}','${datos.antivirus}',${datos.status})`,
    (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
     
      res.send({ status: 204, message: "Producto creado exitosamente" });
    }
  );
});
//Delete equip
router.delete("/equip/:id", (req, res) => {
  try {
    const sql = `UPDATE  equipments SET status = 3 WHERE equipments.id = ${req.params.id}`;
    db.query(sql, (error, result) => {
      
      if (result.affectedRows <= 0) {
        res.send({
          status: 404,
          message: "No se puedo eliminar el equipo, equipo no encontrado",
        });
        return;
      }
  
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
  console.log(sql)
  
    db.query(sql, (error, result) => {
      console.log(result)
      if (result.affectedRows < 1) {
     
        res.status(404).send({ status: 404, message: "Equipo no encontrado" });
        return;
      }
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
     
      res.send(result);
    });
    
  } catch (error) {
    console.log(error)
    
  }
 
});
module.exports = router;
