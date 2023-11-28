const express = require("express");
const router = express.Router();
const db = require("../db.js");
const helper = require("./../lib/helpers.js");
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");

//traer parametros, ya no me acuerdo que parametros eran
router.get("/", (req, res) => {
  db.query(
    "SELECT paramtype_id, name, id, param_state FROM params WHERE paramtype_id = 204 OR paramtype_id = 203 OR paramtype_id = 208 OR paramtype_id = 201  ",
    (error, result) => {
      res.send(result);
    }
  );
});


//Guardar un parametro
router.post("/params", (req, res) => {
  const { paramType_Id, value } = req.body;
  var idRows;
  db.query(
    `SELECT id FROM params WHERE paramtype_id = ${paramType_Id}`,
    (error, result) => {
      idRows = result.map((ids) => {
        return ids.id;
      });
      const lastId = idRows[idRows.length - 1];
      db.query(
        `INSERT INTO params(paramtype_id,name,param_state,id) VALUES(${paramType_Id},'${value}',1,${143 +
          lastId + 1
        })`,
        (error, result) => {
          if (error) {
            console.log(error);
            res.send(error);
            return;
          }
          res.send(result);
        }
      );
    }
  );
});

router.get("/events_type", (req, res) => {
  db.query(
    "SELECT id, name FROM params where paramtype_id=200",
    (error, result) => {
      res.send(result);
      console.log(result);
    }
  );
});

router.post("/verifyToken", async (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      res.status(500).json({ status: 500, error });
      console.log(error);
    } else {
      db.query(
        `SELECT users.*, params.name FROM users INNER JOIN params on params.id = users.rol WHERE users.id=${user.id}`,
        (error, row) => {
          if (error) return console.log(error);
          const usuario = {
            id: row[0].id,
            username: row[0].username,
            email: row[0].email,
            rolName: row[0].name,
            rol: row[0].rol,
          };
          res.status(200).json({ status: 200, user: usuario });
        }
      );
    }
  });
});
router.post("/changePassword", (req, res) => {
  const { id } = req.body;
//Buscat el usuario que tenga ese id
  db.query(
    "SELECT password,rol from users where id = ? ",
    [id],
    async (err, rows) => {
      if (err) throw new Error(err);
      //Validar que hayan usuarios con ese id
      if (rows.length > 0) {
        //Traer el rol y la contraseña del usuario a editar
        const rol = rows[0].rol;
        const oldpassword = rows[0].password;

        //Validar si es usuario es administrar o no
        if (rol != 271) {
          //Si NO es administrador  validar que las contraseñas sean iguales
          const newPassword = req.body.Newpassword;
          const confirmPassword = req.body.Confirmpassword;

          if (newPassword === confirmPassword) {
            const hashPassword = await helper.encypt(newPassword); //Si son iguales encriptar la contraseña nueva
            //Actualizar usuario
            db.query(
              "UPDATE users SET password = ? where id = ?",
              [hashPassword, id],
              (error, result) => {
                if (error) throw new Error(error);
                console.log(result);
                res.send("Usuario actualizado Correctamente!"); //Usuario  Actualizado
              }
            );
            //Si son diferentes Enviar el error
          } else {
            res.status(300).send(["Las contraseñas no son iguales..."]);
          }

          //SI es usuario es admin
        } else {
          //Validar si la contraseña actual es la misma que envió
          const Password = req.body.Password;
        
          const isMatch =  await helper.compare(Password, oldpassword);
          console.log(isMatch)
          //Si es igual
          if (isMatch == true) {
    
            const newPassword = req.body.Newpassword;
            const confirmPassword = req.body.Confirmpassword;
            if (newPassword === confirmPassword) {
                const hashPassword = await helper.encypt(newPassword); //Si son iguales encriptar la contraseña nueva
                //Actualizar usuario
                db.query(
                  "UPDATE users SET password = ? where id = ?",
                  [hashPassword, id],
                  (error, result) => {
                    if (error) throw new Error(error);
                    console.log(result);
                    res.send("Usuario actualizado Correctamente!"); //Usuario  Actualizado
                  }
                );
                //Si son diferentes Enviar el error
              } else {
             
                res.status(300).send(["Las contraseñas no son iguales..."]);
              }

              //Si la contraseña actual es erronea
          }else{
             
                res.status(300).send(["La contraseña actual es incorrecta..."])
          }
        }
      }
    }
  );

});


//Manejo de parametros
router.put("/editParams/:id",(req,res)=>{
  const id = req.params.id;
  const{ name}  =req.body 
  const año  =   new Date().getFullYear()
  const dia  =   new Date().getDay()
  const mes  =   new Date().getMonth()
  
   db.query(`UPDATE params SET name = ?, updated_at = ${año}-${mes}-${dia} WHERE id = ? `,[name,id],(error,result)=>{
    if(error){
      console.log(error)
      return  res.status(500).send("Tuvimos un error")
    }
        res.send("Editado Correctamente")

   })


})
router.delete("/deleteParams/:id",(req,res)=>{
  const id = req.params.id;
  const año  =   new Date().getFullYear()
  const dia  =   new Date().getDay()
  const mes  =   new Date().getMonth()
  db.query(`UPDATE params SET param_state = 3, updated_at = ${año}-${mes}-${dia} WHERE id = ? `,[id],(error,result)=>{
    if(error){
      console.log(error)
      return  res.status(500).send("Tuvimos un error")
    }
        res.send("Eliminado Correctamente")

   })
})
module.exports = router;
