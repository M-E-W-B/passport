const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = global.Promise;

const open = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.database.url, config.database.options, err => {
      if (err) return reject(err);
      console.log("Connected to mongodb.");
      resolve();
    });
  });
};

const close = mongoose.disconnect;

module.exports = { close, open };
