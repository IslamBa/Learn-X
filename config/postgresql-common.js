var mysql = require('mysql');
const { MySQL } = require("./keys");

var con = mysql.createConnection(MySQL);

async function connect() {
    try {
        await con.connect();
        console.log("connected!");
    } catch (error) {
        console.log(error);
    }
}

connect();

async function query(queryString, param) {
    let res = await con.query(queryString);
    console.log(res.results);
}

function nonQuery(queryString, param) {
    try {
        client.query(queryString, param);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { query, nonQuery }