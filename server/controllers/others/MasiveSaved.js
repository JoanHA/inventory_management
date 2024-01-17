const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("./../../db.js");
const fs = require("fs");
const helper = require("../../lib/helpers.js");
const readXlsxFile = require("read-excel-file/node");
const util = require("util");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/masive"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

async function getParam() {
  try {
    db.query = util.promisify(db.query);
    const res = await db.query(
      "SELECT name, id FROM params WHERE paramtype_id =201 or paramtype_id =203 or paramtype_id =204 or paramtype_id =208"
    );

    return res;
  } catch (error) {
    console.log(error);
  }
}

async function getParamId(params, name, type) {
  try {
    db.query = util.promisify(db.query);
    const resultado = params.find(
      (row) => row.name.toUpperCase() == name.toUpperCase()
    );
    if (resultado) {
      return resultado.id;
    } else {
      //Buscar el ultimo parametro
      const result = await db.query(
        `SELECT id FROM params WHERE paramtype_id = ${type}`
      );
      const idRows = result.map((ids) => {
        return ids.id;
      });
      //Ultimo id de los parametros
      const lastId = idRows[idRows.length - 1];

      //SQL
      const sql = `INSERT INTO params
      (id, paramtype_id ,name, param_state)
      values
      (${100 + lastId + 1},${type},'${name.toUpperCase()}',1)`;

      await db.query(sql);
      return 100 + lastId + 1;
    }
  } catch (error) {
    console.log(error);
    return 262;
  }
}

async function getUserId(name) {
  //Name has been change for dni
  try {
    db.query = util.promisify(db.query);

    //Buscar el ultimo parametro
    const result = await db.query(`SELECT id FROM workers WHERE dni='${name}'`);
    console.log("Resultado: ", result);
    if (result.length <= 0) {
      return null;
    }
    return result[0].id;
  } catch (error) {
    console.log(error);
    return 262;
  }
}

async function saveInDb(exFile) {
  try {
    var datos = [];
    var campos = {};
    readXlsxFile(exFile).then(async (rows) => {
      rows.shift();
      console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        const elementDirty = rows[i];
        if (elementDirty[3] == null) {
          continue;
        }
        const element = elementDirty;
        campos.name = element[0];
        campos.user = element[1];
        campos.model = element[2];
        campos.location = element[3];
        campos.office = element[4];
        campos.description = element[5];
        campos.seria = element[6];
        campos.mark = element[7];
        campos.equipment_type = element[8];
        campos.phone = element[9];
        campos.ram = element[10];
        campos.hard_disk = element[11];
        campos.ram_type = element[12];
        campos.hard_type = element[13];
        campos.proccesor = element[14];
        campos.system = element[15];
        campos.status = element[16].toUpperCase() == "ACTIVO" ? 1 : 2;
        campos.antivirus = element[17];
        campos.bought_at = helper.convertTime(element[18]);
        campos.init_value = element[19];
        campos.final_value = element[20];
        campos.deliver_at = helper.convertTime(new Date());
        datos.push(campos);
        campos = {};
      }
      
      // console.log(datos)
      for (let index = 1; index < datos.length; index++) {
        //Empieza en 1 porque el 0 son los encabezados
        const element = datos[index];
        const p = await getParam(); //Parametros desde la DB
        const newRam_type = await getParamId(p, element.ram_type, 204);
        const newHard = await getParamId(p, element.hard_type, 203);
        const newMark = await getParamId(p, element.mark, 201);
        const newtype = await getParamId(p, element.equipment_type, 208);
        const userId = await getUserId(element.user);

        //Equipo a guardar
        const equip = {
          name: element.name,
          user: userId,
          model: element.model,
          location: element.location,
          office: element.office,
          description: element.description,
          serial: element.seria,
          mark: newMark,
          phone: element.phone,
          proccesor: element.proccesor,
          equipment_type: newtype,
          ram: element.ram,
          hard_disk: element.hard_disk,
          ram_type: newRam_type,
          hard_type: newHard,
          system: element.system,
          status: element.status,
          antivirus: element.antivirus,
          bought_at: element.bought_at,
          init_value: element.init_value,
          final_value: element.final_value,
          deliver_at: element.deliver_at,
        };
        console.log(equip);
        db.query("INSERT INTO equipments SET ?", [equip], (err, result) => {
          if (err) return console.log(err);
          return true;
        });
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}


router.post("/", multer({ storage }).single("file"), async (req, res) => {
  const file = req.file;

  try {
    await saveInDb(
      path.join(__dirname + "../../../public/uploads/masive/" + file.filename)
    );
    res.send("Se guardo correctamente!");
  } catch (error) {
    console.log(error);
    res.status(500).send("No sentimos algo salio mal");
  }
});
module.exports = router;
