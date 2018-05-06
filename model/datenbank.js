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
                var users = [];
                for (let el of rows) {
                    users.push({ b_id: el.b_id, name: el.name, passwort: el.passwort })
                }
                //var user = { b_id: rows[0].b_id, name: rows[0].name, passwort: rows[0].passwort };
                resolve(users);
            }
            else
                console.log("Fehler beim Query aufgetreten");
        });
    });
    return await promise;
}

async function getUser(name) {
    try {
        let promise = new Promise(resolve => {
            connection.query('SELECT * FROM benutzer WHERE BINARY name = ?', [name], function (err, rows, fields) {
                if (!err) {
                    var user = { b_id: rows[0].b_id, name: rows[0].name, passwort: rows[0].passwort };
                    console.log(user);
                    resolve(user);
                }
                else
                    console.log("Fehler beim Query aufgetreten");
            });
        });
        return await promise;
    }
    catch (error) {
        throw error;
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

module.exports = { getUsers, addUser, getUser };
