const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const equip = require("./routes/equip.js");
const util = require("./routes/utilities.js");
const events = require("./routes/events.js");
const path = require("path");
const login = require("./controllers/authControllers/login.js");
const multer = require("multer");
const storage = require("./lib/storage.js");
const uploader = multer({ storage });
const cookieParser = require("cookie-parser");

//initialize
const app = express();
const cors = require("cors");
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
app.use("/utils", util); // Route for params and extra things
app.use("/api/events", uploader.single("fileAdjunt"), events); //Route for events

//Auth routes
app.use("/auth", login);

//Server listening
app.listen(app.get("port") || 3000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
