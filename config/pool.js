const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const db_config = {
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 300,


    idleTimeoutMillis: 200,

    max: 20,

}
const pool = new Pool(db_config);

pool.on('connect', (client) => {
    //client.query('SET DATESTYLE = iso, mdy')

    console.log("database connection connect");
})


pool.on('remove', (client) => {


    console.log("database connection removed");
})
module.exports = pool;