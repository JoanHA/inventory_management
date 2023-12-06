const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("./../../db.js");
const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");
const util = require("util");
const helper = require("../../lib/helpers.js")
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/masive"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
async function saveInDb(exFile) {
  try {
    readXlsxFile(exFile).then(async (rows) => {
      rows.map((worker, index) => {
        if (index == 0) return;
        const datos = {
          dni: worker[1],
          name: worker[2],
          area: worker[3],
          branch: worker[4],
          occupation: worker[6],
          enroll_date:helper.convertDate(worker[5]),
          status: 1,
        };
      
      
        db.query("INSERT INTO workers SET ?", [datos], (err, result) => {
          if (err) throw new Error(err);
          return  ;
        });
      });
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
