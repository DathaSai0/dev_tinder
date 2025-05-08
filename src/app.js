const express = require("express");
const connectMangoDb = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const user = require("./models/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const userObj = req.body;
  const { password } = req.body;
  // // creating the new instance of the user model
  try {
    validateSignUpData(req);

    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);
    const user = new User({ ...userObj, password: passwordHash });

    await user.save();
    res.send("user added successfully");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

app.post("/login", async (req, res, next) => {
  const { emailId, password } = req.body;

  try {
    const result = await User.findOne({
      emailId,
    });
    if (!result) {
      return res.status(400).send({
        message: "user not found",
      });
    }

    const isPasswordValid = result.validatePassword(password);
    if (isPasswordValid) {
      // need to the add the jwt token and send
      const token = await result.getJWT(); // mongoose method
      res.cookie("token", token);
      return res.status(200).send({
        message: "User logged in successfully",
      });
    } else {
      return res.status(404).send({
        message: "password is not correct",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
});

app.get("/profile", userAuth, async (req, res, next) => {
  try {
    const user = req?.user;
    if (!user) {
      return res.status(400).send({
        message: "user not found",
      });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res, next) => {
  try {
    res.send(`${req.user.firstName} send the connection request`);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
});

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
