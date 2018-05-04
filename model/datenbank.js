var mysql = require('mysql');
var connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "learnx",
    password: ""
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

async function getUsers() {
    let promise = new Promise(resolve => {
        connection.query('SELECT * from benutzer', function (err, rows, fields) {
            if (!err) {
                var user = { b_id: rows[0].b_id, name: rows[0].name, passwort: rows[0].passwort };
                resolve(user);
            }
            else
                console.log("Fehler beim Query aufgetreten");
        });
    });
    return await promise;
}

module.exports = { getUsers };