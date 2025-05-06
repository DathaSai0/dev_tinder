const express = require("express");
const connectMangoDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "datha",
    lastName: "sai",
    emailId: "dathasai@gmail.com",
    password: "Test@1234",
  };

  // creating the new instance of the user model
  const user = new User(userObj);

  await user.save();
  res.send("user added successfully");
});

connectMangoDb()
  .then(() => {
    console.log("connected to the mango db");
    app.listen(3000, () => {
      console.log("app is listening at port 3000");
    });
  })
  .catch((err) => {
    console.log("error while connecting to the data base");
  });
