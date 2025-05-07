const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    lastName: {
      type: String,
      default: "",
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 90,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"]?.includes(value)) {
          throw new Error("gender field is not matching");
        }
      },
    },
    profileImage: {
      type: String,
    },
    about: {
      type: String,
      default: "This is the default text of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// const User = mongoose.model("User", userSchema);
// module.exports = User;
module.exports = mongoose.model("User", userSchema);
