const express = require("express");
const connectMangoDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const userObj = req.body;

  // // creating the new instance of the user model
  try {
    const user = new User(userObj);

    await user.save();
    res.send("user added successfully");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});
// get the user by email
app.post("/user", async (req, res, next) => {
  const email = req.body.email;
  try {
    const result = await User.find({
      emailId: email,
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
});
// api to get the all the users
app.get("/user/list", async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
});

app.delete("/user/delete", async (req, res, next) => {
  const userId = req.body._id;
  try {
    const result = await User.findByIdAndDelete(userId);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
});

app.patch("/user/update", async (req, res, next) => {
  const userId = req.body._id;
  try {
    const result = await User.findByIdAndUpdate(
      { _id: userId },
      {
        ...req.body,
      },
      {
        returnDocument: "after",
      }
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
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
