app.use("/user/:id", (req, res) => {
  console.log(req.params);
  res.send("Hello from server..");
});
// app.use("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Hello from server..");
// });
