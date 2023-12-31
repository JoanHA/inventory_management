const { Router } = require("express");
const router = Router();
const db = require("../../db.js");
const helper = require("../../lib/helpers.js");

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
     FROM users  where users.id <> ${id} and users.status <> 3 `,
    (err, result) => {
      if (err) throw err;
      const data = [];
      result.forEach((element) => {
        const date = new Date( element.created_at);

        // Obtiene los componentes de la fecha (año, mes y día)
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Sumamos 1 para que enero sea 1, febrero 2, etc.
        const day = date.getUTCDate();

        // Formatea la fecha como "YYYY/MM/DD"
        const formattedDate = `${year}/${month
          .toString()
          .padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
        element.created_at = formattedDate 
        data.push(element);
      });

      res.send(data);
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

      res.send(rows[0]);
    }
  );
});
router.post("/create", async (req, res) => {
  try {
    const { email, username, password, rol, status } = req.body; //Get the data
    const hashPassword = await helper.encypt(password); //Encrypt the password
    const user = {
      email,
      password: hashPassword,
      username,
      rol,
      status,
    };

    //Create the user

    // Search same email
    db.query("SELECT * from users where email = ? or username = ? ", [email,username], (err, result) => {
    
      if (result.length > 0) {
        res.status(401).send(["Ese Usuario/Correo ya esta registrado"]);
        return;
      } else {
        //Save user
        db.query("INSERT INTO users SET ?", [user], (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          res.send("Usuario guardado cn exito");
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
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

  db.query(
    `UPDATE users SET ? where users.id = ${id}`,
    [datos],
    (err, rows) => {
      if (err) throw new Error(err);

      res.send("actualizado correctamente ");
    }
  );
});

//create user

module.exports = router;
