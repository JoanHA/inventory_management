const { Router } = require("express");
const router = Router();
const db = require("../../db.js");

//get all
router.get("/getUsers/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT users.email,
  users.id,
  users.username,
  users.created_at,
    (SELECT name from params where params.id = users.status ) AS statusName,
    (SELECT name from params where params.id = users.rol ) AS rolName
     FROM users  where users.id <> ${id} `,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
});

//get one

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.query(
    `SELECT users.email,
  users.id,
  users.username,
  users.created_at,
  users.rol,
  users.status,
    (SELECT name from params where params.id = users.status ) AS statusName,
    (SELECT name from params where params.id = users.rol ) AS rolName
     FROM users where users.id = ${id}`,
    (err, rows) => {
      if (err) {
        return console.log(err);
      }

      console.log(rows);
      res.send(rows[0]);
    }
  );
});

//Delete one
router.put("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `UPDATE users SET status = 3 where  users.id = ${id} `,
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      res.send("Eliminado con exito");
    }
  );
});

//update one
router.post("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, rol, status } = req.body;
  datos = {
    username: name,
    email,
    rol,
    status,
    updated_at: new Date(),
  };

  db.query(`UPDATE users SET ? where users.id = ${id}`,[datos],(err,rows)=>{
    if(err)throw new Error(err)
    console.log(rows)

    res.send("actualizado correctamente ")

  })
});

module.exports = router;
