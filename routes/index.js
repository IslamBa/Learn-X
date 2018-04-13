var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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


module.exports = router;
