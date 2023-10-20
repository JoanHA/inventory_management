const express = require("express");
const morgan = require("morgan")
require("dotenv").config();

//initialize
const app = express();
app.set("port",process.env.PORT)

//Server listening
app.use(morgan("dev"));
app.listen( app.get("port") || 3000,()=>{
    console.log(`listening on port ${process.env.PORT}` );
})