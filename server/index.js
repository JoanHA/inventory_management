const express = require("express");
const morgan = require("morgan")
require("dotenv").config();
const equip = require("./routes/equip.js")
const router = express.Router();
const util = require("./routes/utilities.js")

//initialize
const app = express();
const cors = require("cors")

app.set("port",process.env.PORT)

//middlewares 
app.use(cors())
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use("/api",equip); //Route for equipment
app.use("/utils",util)


//Server listening
app.listen( app.get("port") || 3000,()=>{
    console.log(`listening on port ${process.env.PORT}` );
})