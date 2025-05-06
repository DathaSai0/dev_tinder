const mongoose = require("mongoose");
const { mangoDbUrl } = require("../../connection");

const connectMangoDb = async () => {
  await mongoose.connect(mangoDbUrl);
};

module.exports = connectMangoDb;
