var express = require('express');
var router = express.Router();
var datenbank = require("../model/datenbank");

const passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');


require('./../config/passport')

router.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});


router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/registrieren', function (req, res, next) {
  res.render('registrieren');
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/home'
  }));

router.get('/home',
  ensureLoggedIn(),
  (req, res) => res.render('home', { benutzer: req.user }));

router.get('/logout', (req, res) => {
  req.logout();
  console.log("test");
  res.redirect('/');
});

router.get('/benutzer', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getUsers());
  } catch (error) {
    res.status(400).send(error);
  }
});


// router.get('/benutzer/:name', async function (req, res, next) {
//   try {
//     res.status(200).send(await datenbank.getUser(req.params.name));
//   } catch (error) {
//     res.status(400).send("Benutername nicht bekannt");
//   }
// });

router.get('/groups/:b_id', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getUserGroups(req.params.b_id));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/group/:b_id', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getNewGroup(req.params.b_id));
  } catch (error) {
    res.status(400).send(error);
  }
});

//Holt den Inhalt einer Gruppe
router.get('/content/:rnd_id', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getContent(req.params.rnd_id));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/content/:fid', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.updateContent(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/content/:fid', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.deleteContent(req.params.fid));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/registrieren/neu', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.addUser(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/groups', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.addGroup(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/content/:g_id', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.addContent(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/groups/:b_id', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.joinGroup(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/impressum', function (req, res) {
  res.render('impressum')
});




module.exports = router;
