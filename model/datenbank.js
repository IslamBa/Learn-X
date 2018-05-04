/*const { query, nonQuery } = require("./../config/postgresql-common");

async function getUsers() {
    try {
        let result = await query("SELECT * FROM benutzer");
        console.log(result + " bei funktion getUsers()");
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

async function addUser(obj) {
    try {
        await query("INSERT INTO benutzer (name, passwort) VALUES('$1', '$2')", [obj.name, obj.passwort]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers, addUser };*/