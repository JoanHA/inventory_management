 const passport = require("passport")
 const localStrategy = require("passport-local").Strategy
 const helper  = require("../lib/helpers.js")
 const jwt = require("jsonwebtoken")
/**
 * Don't use passport just hash the password and save the token in a cookie, instead use a normal route 
 * 
 * 
 */

const createToken = require("../controllers/others/CreateToken.js")
const db = require("../db.js")
const Auth = async (req,username,password,done)=>{
    const { email} = req.body;
    const hashPassword =  await helper.encypt(password)
    var id ;
    const user ={
        email,
        password:hashPassword,
        username, 
        rol: 272,
        status: 1
    }
    db.query("INSERT INTO users SET ?",[user],( err, result)=>{
        if(err){
            console.log(err);
            done(err)
        }
       
    });
      db.query("SELECT * FROM users WHERE email =?",[email], async (err,result)=>{
        if(err){
            console.log(err);
            done(err)
            
        }
        const usersaved = result[0]
      
        id = usersaved.id
        const token = await createToken({id: usersaved.id})
        console.log("token", token)
        done(null,usersaved)

      });
      
    // 
      // console.log(res)
      // res.send({status:200,message:"Usuario creado correctamente",token:res.token})
    

}


passport.use('signUp', new localStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},Auth))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser(async (id,done)=>{
    db.query(`select * from users where id = ${id}`
    ,(err, result)=>{
        if(err){console.log(err)  }
            done(null,result)
    })

})