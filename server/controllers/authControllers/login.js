const express = require("express");
const router = express.Router();
const db = require("../../db.js");
const helper = require("../../lib/helpers.js");
const jwt = require("jsonwebtoken");
const createToken = require("../../controllers/others/CreateToken.js");

// router.post("/verifyToken",(req,res)=>{
//   const token = req.cookies.token;

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.log( "Error del token",err)
//       return res.sendStatus(401);
//     }
//       console.log(decoded)
//   })

// })

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT users.*, params.name FROM users INNER JOIN params on params.id = users.rol WHERE users.email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "error" });
        return;
      }
      if (!result[0]) {
        res.send({status:404, message: "Ese usuario no existe" });
        return;
      }

      const userFound = result[0];
      const hashPassword = userFound.password;
      const isMatch = await helper.compare(password, hashPassword);
      if (!isMatch) {
        res.send({ status: 401, message: "Credenciales incorrectas" });
        // res.sendStatus(400).json({message: "Credenciales incorrectas"})
        return;
      }

      const token = await createToken({ id: userFound.id }); //Token

      //Save the token in  a cookie
      res.cookie("token", token);

      //Send to the client
      res.send({
        status: 200,
        data: {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
          rol: userFound.rol,
          rolName: userFound.name,
          token: token,
        },
      });
    }
  );
});
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body; //Get the data
    const hashPassword = await helper.encypt(password); //Encrypt the password
    var error = false;
    //Create the user
    const user = {
      email,
      password: hashPassword,
      username,
      rol: 272,
      status: 1,
    };


    //Search same email
    db.query("SELECT * from users where email = ?",[email],(err,result)=>{
      if(result.length > 0){
        console.log("Hay error")
        error = true;
        res.send({ status: 400, message: "El email ya esta en uso" });
        return;
      }else{
          //Save user
        db.query("INSERT INTO users SET ?", [user], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            db.query(
              "SELECT users.*, params.name FROM users INNER JOIN params on params.id = users.rol WHERE users.email = ?",
              [email],
              async (err, result) => {
                if (err) {
                  console.log(err);
                  res.send({status:500, message: "The user hasn't been created" });
                  return;
                }
                const usersaved = result[0]; // UserFound
                console.log("usuario encontrado",usersaved)
                const token = await createToken({ id: usersaved.id }); //Token
          
                //Save the token in  a cookie
                res.cookie("token", token, { httpOnly: true });
                //Send to the client
                res.send({
                  status: 200,
                  message: {
                    id: usersaved.id,
                    username: usersaved.username,
                    email: usersaved.email,
                    rol: usersaved.rol,
                    rolName: usersaved.name,
                    token: token,
                  },
                });
              }
            );
          });


      }
    })
  
  
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
