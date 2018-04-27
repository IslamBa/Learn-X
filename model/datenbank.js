const { query, nonQuery } = require("./../config/postgresql-common");

async function getUsers() {
    try {
        let result = await query("SELECT row_to_json(benutzer) as obj FROM benutzer");
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers };