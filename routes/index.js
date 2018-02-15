const passport = require("passport");
const { ensureLoggedIn } = require("connect-ensure-login");

const User = require("../models/user");

module.exports = app => {
  // api routes
  app.post("/signup", (req, res, next) => {
    const obj = pick(req.body, [
      "firstName",
      "lastName",
      "password",
      "phoneNumber",
      "email"
    ]);

    if (!obj.password) return next(new Error("Password is required!"));

    if (obj.password.length < 6 || obj.password.length > 20)
      return next(new Error("Only 6 to 20 character length allowed!"));

    const user = new User(obj);
    // store encrypted password
    user.password = user.generateHash(obj.password);
    user
      .save()
      .then(user => res.json(user))
      .catch(next);
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successReturnToOrRedirect: "/",
      failureRedirect: "/login"
    })
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // view routes
  app.get("/", function(req, res) {
    res.render("home", { user: req.user });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/profile", ensureLoggedIn(), function(req, res) {
    res.render("profile", { user: req.user });
  });
};
