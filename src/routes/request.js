const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.get(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user?._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type: " + status,
        });
      }

      const existingUser = await User.findById(toUserId);

      if (!existingUser) {
        return res.status(400).json({
          message: "user does not exists",
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          {
            toUserId: fromUserId,
            fromUserId: toUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "connection request is already exists",
        });
      }

      const createdConnectionReq = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const result = await createdConnectionReq.save();

      res.status(200).send({
        result,
        message: "connection made successfully",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);
requestRouter.get(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res, next) => {
    const loggedInUser = req.user;

    try {
      const status = req.params.status;
      const requestId = req.params.requestId;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "status is invalid",
        });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser?._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(400).json({
          message: "connection request is not found",
        });
      }

      connectionRequest.status = status;
      const result = await connectionRequest.save();
      res.status(200).json({
        message: "request accepted successfully",
        result,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

module.exports = requestRouter;
