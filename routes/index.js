const passport = require("passport");
const { ensureLoggedIn } = require("connect-ensure-login");

const User = require("../models/user");

module.exports = app => {
  // api routes
  app.get(
    "/login/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/login/google/return",
    passport.authenticate("google", {
      successReturnToOrRedirect: "/",
      failureRedirect: "/login"
    })
  );

  // view routes
  app.get("/", function(req, res) {
    res.render("./pages/home", { user: req.user });
  });

  app.get("/login", function(req, res) {
    res.render("./pages/login");
  });

  app.get("/profile", ensureLoggedIn(), function(req, res) {
    res.render("./pages/profile", { user: req.user });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
