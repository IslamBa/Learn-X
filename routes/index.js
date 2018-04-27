var express = require('express');
var router = express.Router();
var modelDatenbank = require('./../model/datenbank');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express', datenbank : await modelDatenbank.getUsers() });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/registrieren', function(req, res, next) {
  res.render('registrieren');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/fragen', function(req, res){
  res.render('fragen')
});

router.get('/impressum', function(req, res){
  res.render('impressum')
});


module.exports = router;
