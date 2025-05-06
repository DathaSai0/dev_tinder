const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  emailId: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

// const User = mongoose.model("User", userSchema);
// module.exports = User;
module.exports = mongoose.model("User", userSchema);
