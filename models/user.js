const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  displayName: String,
  email: String,
  image: String,
  gender: String,
  createdOn: { type: Date, default: Date.now }
});

// set up a mongoose model
module.exports = mongoose.model("User", userSchema);
