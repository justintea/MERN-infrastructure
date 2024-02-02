//* 'require' block
const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
const debug = require("debug")("mern:server");

// const userRouter = require("./routes/userRouter");

const app = express();

//* Middleware block
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//* Middleware to verify token and assign user object of payload to req.user.
app.use(require('./config/checkToken'));

//* SignUp form page 
app.use('/api/users', require('./routes/api/userRouter'));


//* routes block
//? if theres no such route, go to 3000. eg. /user or /vite, go to '/'.
app.get("/api", (req, res) => {
  res.json({ hi: "world" });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



//* Listen block 
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
