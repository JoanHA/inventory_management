const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const equip = require("./routes/equip.js");
const util = require("./routes/utilities.js");
const events = require("./routes/events.js");
const path = require("path");
const login = require("./controllers/authControllers/login.js");
const cookieParser = require("cookie-parser");
const masive = require("./controllers/others/MasiveSaved.js")
const user = require("./controllers/userControllers/user.js")
const cors = require("cors");
const workers = require("./routes/workers.js")

//initialize
const app = express();
app.set("port", process.env.PORT);

//middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public/uploads")));

//Routes
app.use("/api", equip); //Route for equipment
app.use("/api/utils", util); // Route for params and extra things
app.use("/api/events", events); //Route for events
app.use("/api/users",user)
app.use("/api/workers",workers)


//Route to save the data from the excel
app.use("/api/masive",masive)

//Auth routes
app.use("/api/auth", login);

//Server listening
app.listen(app.get("port") || 3000, () => {
  console.log(`listening on port ${process.env.PORT}`);

});
