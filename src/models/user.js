const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user?._id }, "devTinder@@##143", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputBuUser) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(
    passwordInputBuUser,
    user?.password
  );

  return isPasswordValid;
};

// const User = mongoose.model("User", userSchema);
// module.exports = User;
module.exports = mongoose.model("User", userSchema);
