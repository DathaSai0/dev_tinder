const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

const userRouter = express.Router();

// get the all the pending requests for logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const result = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", "firstName lastName profileImage"); //["firstName" , "lastName"]

    res.status(200).json({
      message: "connection requests listed successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const result = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser?._id, status: "accepted" },
          {
            fromUserId: loggedInUser?._id,
            status: "accepted",
          },
        ],
      })
      .populate("fromUserId", "firstName lastName profileImage")
      .populate("toUserId", "firstName lastName profileImage");

    res.status(200).json({
      message: "you connections are listed successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const interactedUsers = await connectionRequest
      .find({
        $or: [
          {
            toUserId: loggedInUser?._id,
          },
          {
            fromUserId: loggedInUser?._id,
          },
        ],
      })
      .select("toUserId fromUserId");

    const interactedUserIds = interactedUsers?.reduce((acc, data) => {
      acc.push(...[data?.fromUserId, data?.toUserId]);
      return acc;
    }, []);

    const result = await user
      .find({
        $and: [
          {
            _id: {
              $nin: interactedUserIds,
            },
          },
          {
            _id: { $ne: loggedInUser?._id },
          },
        ],
      })
      .skip(skip)
      .limit(limit);
    res.send(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = userRouter;
