async function connecting() {
    const { Client } = require('pg');
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'learnxbeta',
        password: 'postgres'
    });

    await client.connect();

    const res = await client.query('SELECT * FROM benutzer');
    console.log(res.rows[0].name); // Hello world!
    await client.end();
}

module.exports = {
    connecting
}