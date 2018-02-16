const passport = require("passport");
const { Strategy } = require("passport-twitter");
const User = require("../models/user");
const { consumerKey, consumerSecret, callbackURL } = require("../config");

module.exports = app => {
  // The function must verify whether the user is valid. If yes, then set user object at `req.user
  passport.use(
    new Strategy(
      {
        consumerKey,
        consumerSecret,
        callbackURL
      },
      function(token, tokenSecret, profile, done) {
        // asynchronous
        process.nextTick(function() {
          User.findOne({ _id: profile.id })
            .then(user => {
              if (user) done(null, user);
              else {
                const user = new User({
                  _id: profile.id,
                  username: profile.username,
                  image: profile.photos[0].value,
                  displayName: profile.displayName
                });

                // save our user to the database
                user
                  .save()
                  .then(user => done(null, user))
                  .catch(done);
              }
            })
            .catch(done);
        });
      }
    )
  );

  // to serialize users into and deserialize users out of the session.
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // to serialize users into and deserialize users out of the session.
  passport.deserializeUser(function(userId, done) {
    User.findById({ _id: userId })
      .then(user => done(null, user))
      .catch(done);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
