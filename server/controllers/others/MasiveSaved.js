const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("./../../db.js");
const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/masive"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const searchParam = async (name, type) => {
  db.query("SELECT id,name from params where name =?", [name], (err, row) => {
    if (err) {
      console.log(err);
    }
    if (row.length > 0) {
      return row[0].name;
    } else {
      db.query(
        "INSERT into params (paramtype_id,name,param_state) values (?,?,1)",
        [type, name],
        (err, result) => {
          if (err) throw new Error(err);
          db.query(
            "SELECT * FROM params where name = ? ",
            [name],
            (err, result) => {
              if (err) throw new Error(err);
              if (result.length > 0) {
                return result[0].name;
              }
            }
          );
        }
      );
    }
  });
};
function saveInDb(exFile) {
  var datos = [];
  var campos = {};
  readXlsxFile(exFile).then(async (rows) => {
    for (let i = 0; i < rows.length; i++) {
      const element = rows[i];
      if (element[2] == null) {
        continue;
      }
      campos.name = element[2];
      campos.user = element[4];
      campos.model = element[6];
      campos.office = element[8];
      campos.description = element[10];
      campos.seria = element[12];
      campos.mark = element[14];
      campos.equipment_type = element[16];
      campos.ram = element[18];
      campos.hard_disk = element[20];
      campos.ram_type = element[22];
      campos.hard_type = element[24];
      campos.system = element[26];
      campos.status = element[28];
      campos.antivirus = element[30];
      campos.status = 1;
      datos.push(campos);
      campos = {};
    }

    for (let index = 1; index < datos.length; index++) {
      const element = datos[index];
    }
    rows.shift();
  });
}

router.post("/", multer({ storage }).single("file"), (req, res) => {
  const file = req.file;
  saveInDb(
    path.join(__dirname + "../../../public/uploads/masive/" + file.filename)
  );

  res.send("Recibido");
});
module.exports = router;
