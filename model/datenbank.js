var mysql = require('mysql');
var connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "learnx",
    password: ""
});

function getUsers() {
     connection.query('SELECT * from benutzer', function (err, rows, fields) {
        if (!err){
            console.log('The solution is: ', JSON.stringify(rows));
            return "banane";
        }
        else
            console.log('Error while performing Query.');
    });
    
}

module.exports = { getUsers };