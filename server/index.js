const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/index").auth;
const courseRoute = require("./routes/index").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// 連結MongoDB
mongoose
  .connect("mongodb://27.147.18.149:7020/mernDB")
  .then(() => {
    console.log("連結到 mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
//course route要被JWT保護，如果沒有被視為unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8087, () => {
  console.log("後端伺服器聆聽在port 8087");
});
