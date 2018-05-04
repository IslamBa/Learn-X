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
    try {
        var users = [];
        let promise = new Promise(resolve => {
            connection.query('SELECT * from benutzer', function (err, rows, fields) {
                if (!err) {
                    for (var i = 0; i < rows.length; i++) {
                        var user = { b_id: rows[i].b_id, name: rows[i].name, passwort: rows[i].passwort };
                        users.push(user);
                    }
                    resolve(users);
                }
                else
                    console.log("Fehler beim Query aufgetreten");
            });
        });
        return await promise;
    } catch (error) {
        console.log(error);
    }
}

async function addUser(obj) {
    try {
        var user = await getUsers();
        var gleicherName = false;
    
        user.forEach(element => {
            if (element.name == obj.name) {
                console.log("gleicher NAME");
                gleicherName = true;
            }
        });
        if (gleicherName == false) {
            var sql = "INSERT INTO benutzer (name, passwort) VALUES ?";
            var values = [
                [obj.name, obj.passwort]
            ];
            connection.query(sql, [values], function (err, rows, fields) {
                if (err) throw err;
                console.log("Number of records inserted: " + rows.affectedRows);
            });
        }
        else {
            throw "benutzername bereits vergeben";
        }
    } catch (error) {
        console.log(error + " plus das");
        throw error;
    }
}

module.exports = { getUsers, addUser };
