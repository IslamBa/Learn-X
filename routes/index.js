var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/learnx', function(req, res, next) {
  res.render('login');
});

router.get('/registrieren', function(req, res, next) {
  res.render('registrieren');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});


module.exports = router;
