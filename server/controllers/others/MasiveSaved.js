const express = require("express")
const router = express.Router();
const multer = require("multer");
const path = require("path");

const fs = require("fs")
const readXlsxFile = require("read-excel-file/node")

const storage  = multer.diskStorage({
    destination: path.join(__dirname,"../../public/uploads/masive"),
    filename: function(req,file,cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

function saveInDb (exFile){

    var datos = []
    var campos ={}
    readXlsxFile(exFile).then((rows)=>{
   
      for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        if (element[2] == null) {
            continue;
        }
            campos.name = element[2]
            campos.user = element[4];
            campos.model = element[6];
            campos.office = element[8];
            campos.description = element[10];
            campos.seria = element[12];
            campos.mark = element[14];
            campos.equipment_type = element[16];
            campos.ram = element[18];
            campos.hard_disk= element[20];
            campos.ram_type= element[22];
            campos.hard_type= element[24];
            campos.system= element[26];
            campos.status= element[28];
            campos.antivirus= element[30];
            datos.push(campos)
            campos = {}
            
      }
      console.log("Campos", campos)
      console.log("datos",datos)
      rows.shift()
    })
}

router.post("/",multer({storage}).single("file"),(req, res)=>{
    const file = req.file
     saveInDb(path.join(__dirname+ "../../../public/uploads/masive/"+file.filename))
  
    res.send("Recibido");
})
module.exports = router