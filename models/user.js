const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  _id: String,
  username: String,
  displayName: String,
  profileUrl: String,
  email: String,
  createdOn: { type: Date, default: Date.now }
});

// set up a mongoose model
module.exports = mongoose.model("User", userSchema);
