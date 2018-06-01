const passport = require('passport');
const { Strategy } = require('passport-local').Strategy;
const {getUser} = require('./../model/datenbank');

passport.use(new Strategy(async (name, passwort, done) => {
    try {
      let user = await getUser(name); 
      if (!user) return done(null, false);
      if (user.passwort != passwort) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(null,null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.name));

passport.deserializeUser(async (name, done) => {
   try {
     let user = await getUser(name);
     done(null,user);
   } catch (err) {
     done(err,null);
   }
});