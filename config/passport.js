var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var { findById, findByUsername } = require('./../model/users');

passport.use(new Strategy(
  function (name, password, cb) {
    findByUsername(name, function (err, user) {
      if (err) return cb(err); 
      if (!user) return cb(null, false); 
      if (user.passwort != password) return cb(null, false); 
      return cb(null, user);
    });
  }));


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  findById(id, function (err, user) {
    if (err) return cb(err); 
    cb(null, user);
  });
});


