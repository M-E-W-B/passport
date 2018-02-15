const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config");
const { passport } = require("./utils");
const routes = require("./routes");
const app = express();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(
  session({ secret: config.secret, resave: false, saveUninitialized: false })
);

// passport configuration and middleware
passport(app);
// routes
routes(app);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({ message: err.message });
});

module.exports = app;
