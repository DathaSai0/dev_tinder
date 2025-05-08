app.use("/user/:id", (req, res) => {
  console.log(req.params);
  res.send("Hello from server..");
});
// app.use("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Hello from server..");
// });

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
