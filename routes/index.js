var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var datenbank = require("../model/datenbank");

/* GET home page. */
/*router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express', users: await datenbank.getUserGroups('islam') });
});*/

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/registrieren', function (req, res, next) {
  res.render('registrieren');
});

router.get('/home/:name', async function (req, res, next) {
  res.render('home', {benutzer: await datenbank.getUser(req.params.name) });
});

router.get('/benutzer', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getUsers());
  } catch (error) {
    res.status(400).send(error);
  }
});

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
router.get('/content/:b_id', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getContent(req.params.b_id));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/benutzer/:name', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getUser(req.params.name));
  } catch (error) {
    res.status(400).send("Benutername nicht bekannt");
  }
});

router.post('/benutzer', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.loginCheck(req.body));
  } catch (error) {
    res.status(400).send("Benutername nicht bekannt");
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
