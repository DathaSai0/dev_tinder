const mongoose = require("mongoose");

const connectionRequest = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status value`,
      },
      // enum: ["ignore", "interested", "accepted", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

connectionRequest.index({ toUserId: 1, fromUserId: 1 });

connectionRequest.pre("save", function (next) {
  const currConnectionRequest = this;

  if (
    currConnectionRequest?.toUserId.equals(currConnectionRequest?.fromUserId)
  ) {
    throw new Error("toUserId and fromUserId cannot be same");
  }

  next();
});

module.exports = new mongoose.model("ConnectionRequest", connectionRequest);
