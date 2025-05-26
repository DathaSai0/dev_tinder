const express = require("express");
const connectMangoDb = require("./config/database");
const cors = require("cors");
const http = require("http");

const cookieParser = require("cookie-parser");
const app = express();
const server = http.createServer(app); // here app is existing express application

app.use(
  cors({
    origin: ["http://localhost:5173/"],

    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

initializeSocket(server);
connectMangoDb()
  .then(() => {
    console.log("connected to the mango db");
    server.listen(3000, () => {
      console.log("app is listening at port 3000");
    });
  })
  .catch((err) => {
    console.log("error while connecting to the data base");
  });
