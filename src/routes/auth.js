const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res, next) => {
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

authRouter.get("/logout", async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.json({
    message: "user logged out successfully",
  });
});

module.exports = authRouter;
