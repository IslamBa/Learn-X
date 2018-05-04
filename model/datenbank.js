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
<<<<<<< HEAD
                
                var user = { b_id: rows[i].b_id, name: rows[i].name, passwort: rows[i].passwort };
                    
                
                resolve(user);
            }
            else
                console.log("Fehler beim Query aufgetreten");
        });
    });
    return await promise;
}

async function getloginUsers(obj) {
    let promise = new Promise(resolve => {
        connection.query('SELECT * from benutzer', function (err, rows, fields) {
            if (!err) {
                for(var i = 0; i < rows.length; i++){
                    if(obj.name == rows[i].name && obj.passwort == rows[i].passwort){
                        $(".login").attr("href","/home");
                    }
=======
                for (var i = 0; i < rows.length; i++) {
                    var user = { b_id: rows[i].b_id, name: rows[i].name, passwort: rows[i].passwort };
                    users.push(user);
>>>>>>> 2e21f68b3fb2c27faf3802850982db0edea2d820
                }
            }
            else
                console.log("Fehler beim Query aufgetreten");
        });
    });
    return await promise;
}

async function addUser(obj) {
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
    else{
        return error;
    }
}

module.exports = { getUsers, addUser, getloginUsers };
