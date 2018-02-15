const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../models/user");

module.exports = app => {
  // The function must verify whether the user is valid. If yes, then set user object at `req.user
  passport.use(
    new Strategy(function(email, password, done) {
      User.findOne({
        email
      })
        .then(user => {
          if (!user) {
            return done(null, false);
          } else if (user) {
            if (!user.validPassword(password)) {
              return done(null, false);
            } else {
              return done(null, user);
            }
          }
        })
        .catch(done);
    })
  );

  // to serialize users into and deserialize users out of the session.
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // to serialize users into and deserialize users out of the session.
  passport.deserializeUser(function(userId, done) {
    User.findById(userId)
      .then(user => done(null, user))
      .catch(done);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
