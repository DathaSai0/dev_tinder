const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // read the user id from the user  from the cookies
  // if the id is not present in the cookies send the auth error message
  //set the req obj with user obj

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).send({
        message:
          "token is not present in the cookies please login to continue ",
      });
    }

    const { _id } = await jwt.verify(token, "devTinder@@##143");
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send({
        message: "user not found by this id",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
};

module.exports = {
  userAuth,
};
