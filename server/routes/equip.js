const express = require("express");
const router = express.Router();
const db = require("../db.js");
const helper = require("../lib/helpers.js")
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const util = require("util");

//Configuracion del storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads/"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


router.use((req, res, next) => {
  next();
});

//Routes


//Get all Cellphones
router.get("/equip/cellphones/all",(req,res)=>{

  const sql = `SELECT equipments.*, 
  (SELECT name  from workers where workers.id  = equipments.user) AS user_name,
  (SELECT name from params where params.id = equipments.status) AS status_name

  FROM equipments 
  WHERE equipments.equipment_type = 263`;
  db.query(sql, (error, result) => {
    if(error){
      console.error(error)
      return res.status(500).send("Tuvimos un error ",error)
    }
    const data = [];

      result.forEach((element) => {
        element.deliver_at =   helper.convertTime(element.deliver_at)
        element.bought_at =   helper.convertTime(element.bought_at)
        data.push(element);
      });
  
      res.send(data);



  })

})


//Get all
router.get("/equip", (req, res) => {
  try {
    const sql =
      "SELECT equipments.*, params.name as paramName,(SELECT name from params where params.id = equipments.status) AS statusName,(select name from workers where workers.id = equipments.user) AS user_name FROM equipments INNER JOIN params on params.id = equipments.mark WHERE equipments.status <> 3";
    db.query(sql, (err, result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//Get equip with files
router.get("/equip/bringFiles", (req, res) => {
  try {

    //Falta arreglar este sql para que envie el link del archivo 
    const sql =
      
    `SELECT equipments.*, 
    params.name as paramName,
    (SELECT name from params where params.id = equipments.status) AS statusName,
    (select name from workers where workers.id = equipments.user) AS user_name ,
    f.file_name as fileName
    FROM equipments 
    INNER JOIN params on params.id = equipments.mark
    LEFT JOIN files f on f.equipment = equipments.id
    WHERE equipments.status <> 3`;
    db.query(sql, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});


//Create equip
const upload =multer({ storage }).array('files',5)
router.post("/equip",upload, async (req, res) => {
  const {
    equip_type,
    ram,
    formatDisk,
    formatRam,
    hard_disk,
  } = req.body;
  const archivos = req.files 

  if (equip_type == null || equip_type == "") {
    equip_type  =232
  }

  const datos = {
    name          :            req.body.name,
    user          :            req.body.user,
    model         :            req.body.model,
    office        :            req.body.office,
    description   :            req.body.description,
    serial        :            req.body.serial,
    mark          :            req.body.mark == "" ? 232 : parseInt(req.body.mark),
    ram_type      :            req.body.ram_type == "" ? 232 : parseInt(req.body.ram_type),
    hard_type     :            req.body.hard_type == "" ? 232: parseInt(req.body.hard_type),
    proccesor     :            req.body.proccesor,
    system        :            req.body.system,
    antivirus     :            req.body.antivirus,
    status        :            req.body.status == "" ? 1 : parseInt(req.body.status),
    init_value    :            req.body.init_value == "" ? 0 : parseInt(req.body.init_value),
    final_value   :            req.body.final_value == "" ? 0 : parseInt(req.body.final_value),
    sub_value     :            req.body.sub_value,
    deliver_at    :            req.body.deliver_at == ""? "0000-00-00":req.body.deliver_at,
    bought_at     :            req.body.bought_at == ""? "0000-00-00":req.body.bought_at,
    phone         :            req.body.phone,
    equipment_type:            parseInt(equip_type),
    ram           :            hard_disk,
    hard_disk     :            hard_disk,
    location      :            req.body.location
  };

 
    
 db.query("INSERT INTO equipments SET ? ",[datos],(err,result)=>{
  if (err) {
    console.log(err)
    res.status(302).send("Tuvimos un error Intenta mas tarde")
    return;
  }
//Insertarle los archivos 
  if(archivos.length >0){
      archivos.map(file=>{
        db.query(`INSERT INTO files (file_name,file_type,equipment)values(?,?,?)`,[file.filename,file.mimetype,result.insertId],(err,result)=>{
          if (err) {
            console.log(err);
            res.status(302).send("Tuvimos un error al guardar los archivos intenta mas tarde")
            return;
          }
          console.log(result)

        })
      })
  }
  res.send({ status: 204, message: "Producto creado exitosamente" });

 })

});
//Agregar archivos a este equipo
router.post("/equip/addFiles/:id",upload,(req,res)=>{
  const archivos = req.files 
  const id = req.params.id;
  var enviados =0;

  if(archivos.length >0){
    archivos.map(file=>{
      db.query(`INSERT INTO files (file_name,file_type, original_name,equipment,status)values(?,?,?,?,?)`,[file.filename,file.mimetype,file.originalname, id , 1],(err,result)=>{
        if (err) {
          console.log(err);
          return res.status(302).send("Tuvimos un error Intenta mas tarde")
        
        }else{
          console.log(result)
          enviados++
          if(enviados == archivos.length){
            res.send("Archivos guardados con exito!")
          }
        }
       
      })

    })
   
}
})

//Obteneer archivos de un equipo
router.get("/equip/files/:id",(req, res)=>{

  const id = req.params.id;
  try {
    if (id  != undefined) {
      const sql = `SELECT *, (select name from equipments where equipments.id = files.equipment) AS equip_name FROM files WHERE equipment = ${id} AND status = 1`;
      db.query(sql, (error, result) => {
        if(error){
          console.log(error);
          res.status(302).send("Tuvimos un error intenta mas tarde")
          return;
        }
        // if (result.length <= 0) {
        //   res.status(404).send({
        //     status: 404,
        //     message: "No se encontraron archivos para este equipo",
        //   });
        //   return;
        // }
        res.send(result);
      });
    }

  } catch (error) {
    console.log(error);
  }
})
//Eliminar archivo
router.delete("/equip/files/:id",(req,res)=>{
  const id = req.params.id;
  try {
    const sql = `UPDATE files SET status = 3 where id = ${id}`;
    db.query(sql, (error, result) => {
      if (result.length <= 0) {
        res.status(404).send({
          status: 404,
          message: "No se encontró este archivo",
        });
        return;
      }
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
})


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
    console.log(error);
  }
});
//Update equip
router.put("/equip/:id", (req, res) => {
  try {
    const {
      equip_type,
      ram,
      hard_disk,
    } = req.body;
   
  
    const datos = {
      name          :            req.body.name,
      user          :            req.body.user,
      model         :            req.body.model,
      office        :            req.body.office,
      description   :            req.body.description,
      serial        :            req.body.serial,
      mark          :            req.body.mark == "" ? 232 : parseInt(req.body.mark),
      ram_type      :            req.body.ram_type == "" ? 232 : parseInt(req.body.ram_type),
      hard_type     :            req.body.hard_type == "" ? 232: parseInt(req.body.hard_type),
      proccesor     :            req.body.proccesor,
      system        :            req.body.system,
      antivirus     :            req.body.antivirus,
      status        :            req.body.status == "" ? 1 : parseInt(req.body.status),
      init_value    :            req.body.init_value,
      final_value   :            req.body.final_value,
      sub_value     :            req.body.sub_value,
      deliver_at    :            req.body.deliver_at,
      bought_at     :            req.body.bought_at,
      phone         :            req.body.phone,
      equipment_type:            parseInt(equip_type),
      ram           :            ram,
      hard_disk     :            hard_disk,
      location      :            req.body.location
    };
  
   
    const sql = `UPDATE equipments SET ? WHERE id = ${req.params.id};`;


    db.query(sql,[datos], (error, result) => {
      if (error) {
        console.log(error)
        return res.status(500).send({ error: "Tuvimos un error" });
      }

    
      if (result.affectedRows < 1) {
        res.status(404).send({ status: 404, message: "Equipo no encontrado" });
        return;
      }
      res.send({ status: 200, message: "Equipo Actualizado correctamente" });
    });
  } catch (error) {
    console.log(error);
  }
});
//Get one
router.get("/equip/:id", (req, res) => {
  try {
    const sql = `SELECT equipments.*,
    (SELECT name FROM params WHERE params.id = equipments.mark) AS mark_name,
    (SELECT name FROM params WHERE params.id = equipments.equipment_type) AS equipment_type_name,
    (SELECT name FROM params WHERE params.id = equipments.ram_type) AS ram_type_name, 
    (SELECT name FROM params WHERE params.id = equipments.hard_type) AS hard_type_name,
    (SELECT name FROM workers WHERE workers.id = equipments.user) AS user_name
    FROM equipments WHERE equipments.id = ${req.params.id};`;
    db.query(sql, (error, result) => {
      console.log(error)
      if (result.length <= 0) {
        res.send({ status: 404, message: "Equipo no encontrado" });
        return;
      }
      const data = [];

      result.forEach((element) => {
        element.deliver_at =   helper.convertTime(element.deliver_at)
        element.bought_at =   helper.convertTime(element.bought_at)
        data.push(element);
      });
  
      res.send(data);

   
    });
  } catch (error) {
    console.log(error);
  }
});

//get device life 
router.get("/equip/historical/:id", (req, res) => {
  const equipId = req.params.id;

  const sql = `
  SELECT 
    e.name AS equipment_name,
    e.created_at,
    e.user,
    e.id AS equipID,
    e.office,
    e.serial,
    e.mark,
    e.model,
    e.equipment_type,
    e.ram,
    e.ram_type,
    e.hard_disk,
    e.proccesor,
    e.system,
    e.antivirus,
    e.description,
    e.status,
    ev.id AS eventID,
    ev.name AS eventName,
    ev.description AS eventDescription,
    ev.file,
    ev.importance,
    ev.client,
    ev.event_reason,
    ev.equip,
    ev.created_by,
    ev.created_at AS eventCreatedAt,
    pm.name AS mark_name,
    pet.name AS equipment_type_name,
    prm.name AS ram_type_name,
    pht.name AS hard_type_name,
    pst.name AS status_name,
    (select name from workers where workers.id = e.user) AS user_name,

    pevt.name AS event_type_name,
    pim.name AS event_importance,
    pevst.name AS event_status_name,
    prs.name AS event_reason_name,
    u.username AS event_created_by_name
FROM 
    equipments e
INNER JOIN 
    events ev ON ev.equip = e.id
LEFT JOIN 
    params pm ON pm.id = e.mark
LEFT JOIN 
    params pet ON pet.id = e.equipment_type
LEFT JOIN 
    params prm ON prm.id = e.ram_type
LEFT JOIN 
    params pht ON pht.id = e.hard_type
LEFT JOIN 
    params pst ON pst.id = e.status 
LEFT JOIN 
    params pevt ON pevt.id = ev.event_type
LEFT JOIN 
    params pim ON pim.id = ev.importance
LEFT JOIN 
    params pevst ON pevst.id = ev.status
LEFT JOIN 
      params prs ON prs.id = ev.event_reason
LEFT JOIN
    users u ON u.id = ev.created_by
WHERE 
    e.id = ${equipId}`;

      db.query(sql, (error, result) => {
        if(error){
          res.status(500).send("Error")
          console.log(error)
          return;
        }
        if (result.length <= 0) {
          res.status(404).send({ status: 404, message: "Equipo no tiene eventos" });
          return;
        }
        res.send(result);
      })

});



module.exports = router;
