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
  const sql = "SELECT equipments.*, params.name as paramName FROM equipments INNER JOIN params on params.id = equipments.mark where status =1;";
  db.query(sql, (err, result) => {
    res.send(result);
  });
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
    stock,
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
    stock,
    antivirus,

    status: 1,
  };
  db.query(
    `INSERT INTO equipments(name,user,model,office,description,serial,mark,equipment_type,ram,hard_disk,ram_type,hard_type,proccesor,system,stock,antivirus,status) VALUES('${datos.name}','${datos.user}','${datos.model}','${datos.office}','${datos.description}','${datos.serial}',${datos.mark},${datos.equipment_type},'${datos.ram}','${datos.hard_disk}',${datos.ram_type},${datos.hard_type},'${datos.proccesor}','${datos.system}',${datos.stock},'${datos.antivirus}',${datos.status})`,
    (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(result);
      res.send({ status: 204, message: "Producto creado exitosamente" });
    }
  );
});
//Delete equip
router.delete("/equip/:id", (req, res) => {
  const sql = `UPDATE equipments SET  status = 2 WHERE equipments.id = ${req.params.id}`;
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
});
//Update equip
router.put("/equip/:id", (req, res) => {
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
    stock,
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
    stock,
    antivirus,
    status: 1,
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
  stock = ${datos.stock},
  antivirus = '${datos.antivirus}',
  status = ${datos.status},
  serial = '${datos.serial}'
WHERE id = ${req.params.id};`;

  db.query(sql, (error, result) => {
    if (result.affectedRows < 1) {
      res.send({ status: 404, message: "Equipo no encontrado" });
      return;
    }
    res.send({ status: 200, message: "Equipo Actualizado correctamente" });
  });
});
//Get one
router.get("/equip/:id", (req, res) => {
  const sql = `SELECT * FROM equipments where id=${req.params.id}`;
  db.query(sql, (error, result) => {
    if (result.length <= 0) {
      res.send({ status: 404, message: "Equipo no encontrado" });
      return;
    }
    console.log("Equipo encontrado exitosamente");
    res.send(result);
  });
});
module.exports = router;
