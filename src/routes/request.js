const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/request", userAuth, async (req, res, next) => {
  try {
    res.send(`${req.user.firstName} send the connection request`);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
});
module.exports = requestRouter;
