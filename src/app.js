const express = require("express");
const connectMangoDb = require("./config/database");

const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectMangoDb()
  .then(() => {
    console.log("connected to the mango db");
    app.listen(3000, () => {
      console.log("app is listening at port 3000");
    });
  })
  .catch((err) => {
    console.log("error while connecting to the data base");
  });
