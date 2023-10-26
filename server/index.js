const express = require("express");
const morgan = require("morgan")
require("dotenv").config();
const equip = require("./routes/equip.js")
const util = require("./routes/utilities.js")
const events  = require ("./routes/events.js")
const multer = require("multer")
const path = require("path")
const passport   = require("passport")
require("./lib/passport.js")
const session = require("express-session")
const login = require("./controllers/authControllers/login.js")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname+"/public/uploads"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
//initialize
const app = express();
const cors = require("cors")
app.set("port",process.env.PORT)
app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


//middlewares 
app.use(cors())
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use("/api",equip); //Route for equipment
app.use("/utils",util) // Route for params and extra things
app.use("/api/events",events) //Route for events

//Auth routes
app.post("/login",passport.authenticate("signUp",{
  failureRedirect:"/",
  successRedirect:"/success"
}), login)


//Server listening
app.listen( app.get("port") || 3000,()=>{
    console.log(`listening on port ${process.env.PORT}` );
})