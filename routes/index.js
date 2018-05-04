var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "learnx",
    password: ""
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * from benutzer', function (err, rows, fields) {
    if (!err){
        console.log('The solution is: ', rows);
        var user = {b_id: rows[0].b_id, name: rows[0].name, passwort: rows[0].passwort};
        console.log(user);
        res.render('index', { title: 'Express', users : user });
    }
    else
        console.log('Error while performing Query.');
});

  
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
