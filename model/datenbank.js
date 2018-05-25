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

async function loginCheck(obj) {
    try {
        let promise = new Promise(resolve => {
            connection.query('SELECT * FROM benutzer WHERE BINARY name = ?', [obj.name], function (err, rows, fields) {
                if (!err && rows.length > 0) {
                    var user = { b_id: rows[0].b_id, name: rows[0].name, passwort: rows[0].passwort };
                    console.log(user);
                    if (user.name == obj.name && user.passwort == obj.passwort) {
                        resolve(user);
                    }
                    else {
                        //throw "Name und Passwort stimmen nicht überein";
                        resolve(false);
                    }
                }
                else {
                    resolve("pech");
                }
            });
        });
        return await promise;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUser(name) {
    try {
        let promise = new Promise(resolve => {
            connection.query('SELECT * FROM benutzer WHERE BINARY name = ?', name, function (err, rows, fields) {
                if (!err) {
                    var user = { b_id: rows[0].b_id, name: rows[0].name, passwort: rows[0].passwort };
                    console.log(user);
                    resolve(user);
                }
                else {
                    throw err;
                }
            });
        });
        return await promise;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserGroups(id) {
    try {
        let promise = new Promise(resolve => {
            connection.query('SELECT * FROM benutzer JOIN benutzer_liste USING(b_id) JOIN liste USING(l_id) WHERE b_id = ? GROUP BY g_name', id, function (err, rows, fields) {
                if (!err) {
                    var userGroup = [];
                    rows.forEach(element => {
                        userGroup.push({
                            b_id: element.b_id,
                            name: element.name,
                            l_id: element.l_id,
                            g_name: element.g_name,
                            pers_anz: element.pers_anz,
                            rnd_id: element.rnd_id
                        })
                        console.log(element);
                    });
                    resolve(userGroup);
                }
                else if (rows.length < 0) {
                    resolve(false);
                }
                else {
                    throw err;
                }
            });
        });
        return await promise;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function addGroup(obj) {
    try {
        connection.query('INSERT INTO liste (g_name, pers_anz, rnd_id) VALUES (?,1,?)', [obj.g_name, obj.rnd_id], function (err, rows, fields) {
            if (!err) {
                console.log("letzte id " + rows.insertId);
                connection.query('INSERT INTO benutzer_liste (b_id, l_id) VALUES(?,?)', [obj.b_id, rows.insertId], function (err, rows, fields) {
                    if (!err) {
                        console.log("Neue Gruppe hinzugefügt");
                    }
                    else {
                        throw err;
                    }
                });
            }
            else {
                throw err;
            }
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function joinGroup(obj) {
    try {
        connection.query('SELECT l_id FROM liste WHERE rnd_id = ?', [obj.rnd_id], function (err, rows, fields) {
            if (!err) {
                console.log(rows[0].l_id);
                var l_id = rows[0].l_id;
                connection.query('INSERT INTO benutzer_liste (b_id, l_id) VALUES(?,?)', [obj.b_id, l_id], function (err, rows, fields) {
                    if (!err) {
                        console.log("In Gruppe gejoint");
                        connection.query('UPDATE liste SET pers_anz=pers_anz+1 WHERE rnd_id = ?', [obj.rnd_id], function (err, rows, fields) {
                            if (!err) {
                                console.log("Personen Anzahl erhöht");
                            }
                            else {
                                throw err;
                            }
                        });
                    }
                    else {
                        throw err;
                    }
                });
            }
            else {
                throw err;
            }
        });
    }
    catch (error) {
        console.log(error);
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

async function getContent(rnd_id) {
    try {
        let promise = new Promise(resolve => {
            connection.query('SELECT * FROM liste JOIN inhalt USING(l_id) WHERE rnd_id = ?', rnd_id, function (err, rows, fields) {
                if (!err) {
                    var content = [];
                    rows.forEach(element => {
                        content.push({
                            l_id: element.l_id,
                            g_name: element.g_name,
                            pers_anz: element.pers_anz,
                            f_id: element.f_id,
                            frage: element.frage,
                            antwort: element.antwort,
                            rnd_id: element.rnd_id
                        })
                        console.log(element);
                    });
                    resolve(content);
                }
                else if (rows.length < 0) {
                    resolve(false);
                }
                else {
                    throw err;
                }
            });
        });
        return await promise;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function addContent(obj) {
    try {
        connection.query('SELECT l_id FROM liste WHERE rnd_id = ?', [obj.rnd_id], function (err, rows, fields) {
            if (!err) {
                var g_id = rows[0].l_id;
                connection.query('INSERT INTO inhalt(frage, antwort, l_id) VALUES (?, ?, ?)', [obj.frage, obj.antwort, g_id], function (err, rows, fields) {
                    if (!err) {
                        console.log("Neuen Inhalt hinzugefügt");
                    }
                    else {
                        throw err;
                    }
                });
            }
            else {
                throw err;
            }
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateContent(obj) {
    try {
        console.log(obj.frage + "  " + obj.antwort);
        connection.query('UPDATE inhalt SET frage=?, antwort=? WHERE f_id = ?', [obj.frage, obj.antwort, obj.fid], function (err, rows, fields) {
            if (!err) {
                console.log("Inhalt verändert");
            }
            else {
                throw err;
            }
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getUsers,
    addUser,
    getUser,
    loginCheck,
    getUserGroups,
    addGroup,
    getContent,
    joinGroup,
    addContent,
    updateContent
};
