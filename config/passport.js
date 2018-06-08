const passport = require('passport');
const { Strategy } = require('passport-local').Strategy;
const { getUser } = require('./../model/datenbank');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');

passport.use(new Strategy(async (name, passwort, done) => {
  try {
    let user = await getUser(name);
    let passwordCheck = await bcrypt.compareSync(passwort, user.passwort);
    if (!user) return done(null, false,req.flash('Warnmeldung', 'Passwort oder Benutzername falsch.'));
    if (!passwordCheck) return done(null, false, req.flash('Warnmeldung', 'Passwort oder Benutzername falsch.'));
    return done(null, user);
  } catch (error) {
    return done(null, null);
  }
}
));

passport.serializeUser((user, done) => done(null, user.name));

passport.deserializeUser(async (name, done) => {
  try {
    let user = await getUser(name);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});