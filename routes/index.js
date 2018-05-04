var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var datenbank = require("../model/datenbank");

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express', users: await datenbank.getUsers() });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/registrieren', function (req, res, next) {
  res.render('registrieren');
});

router.get('/benutzer', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.getUsers());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/registrieren/neu', async function (req, res, next) {
  try {
    res.status(200).send(await datenbank.addUser(req.body) + "Hier gehts");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/login/neu', function (req, res, next) {
  try {
    res.status(200).send(datenbank.getloginUsers(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/home', function (req, res, next) {
  res.render('home');
});

router.get('/fragen', function (req, res) {
  res.render('fragen')
});

router.get('/impressum', function (req, res) {
  res.render('impressum')
});


module.exports = router;
