const jwt = require("jsonwebtoken");
 function createToken(payload){
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 
        process.env.JWT_SECRET,{
            expiresIn: "1d"
        }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
  });
};



module.exports = createToken