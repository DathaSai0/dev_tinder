const express = require("express");
const { userAuth } = require("../middlewares/auth");

const { validateProfileUpdateData } = require("../utils/validation");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res, next) => {
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
profileRouter.post("/update/profile", userAuth, async (req, res, next) => {
  try {
    const isValid = validateProfileUpdateData(req);
    if (!isValid) {
      throw new Error("update failed..");
    }

    const userObj = req.user;
    console.log(userObj);

    const result = await User.findByIdAndUpdate(userObj?._id, req.body);

    res.json({
      message: "user updated successfully",
      updatedUser: result,
    });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
      error: error,
    });
  }
});
profileRouter.post("/forget/password", userAuth, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const passwordHash = await bcrypt(req.body.password, 10);
    const result = await User.findByIdAndUpdate(userId, {
      password: passwordHash,
    });

    res.json({
      message: "password updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
      error: error?.message,
    });
  }
});
module.exports = profileRouter;
