const { Client } = require("pg");
const { postgreSQL } = require("./keys");

const client = new Client(postgreSQL);

async function connect() {
    try {
        await client.connect();
        console.log("connected!");
    } catch (error) {
        console.log(error);
    }
}

connect();

async function query(queryString, param) {
    try {
        let res = await client.query(queryString, param);
        let resultArray = [];
        for (let row of res.rows)
            resultArray.push(row.obj);

        return resultArray;
    } catch (error) {
        console.log(error);
    }
}

async function nonQuery(queryString, param) {
    try {
        await client.query(queryString, param);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { query, nonQuery }