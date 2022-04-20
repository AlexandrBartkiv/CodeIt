const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const knex = require('knex');

const app = express();

let initialPath = path.join(__dirname, "public");



app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/',(req,res)=>{
    res.sendFile(path.join(initialPath, "index.html"))
})


app.listen(3000, (req,res)=>{
    console.log('port 3000')
})








const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    port: 5432,
});

const client2 = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'test',
    port: 5432,
});
const execute = async (query) => {
    try {
        await client2.connect();     // gets connection
        await client2.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client2.end();         // closes connection
    }
};
const text = `
    CREATE TABLE IF NOT EXISTS users (
	    "id" SERIAL NOT NULL PRIMARY KEY,
	    "name" VARCHAR(255) NOT NULL,
	    "email" VARCHAR(255) NOT NULL UNIQUE,
        "login" VARCHAR(255) NOT NULL UNIQUE,
        "birth date" DATE,
        "country" VARCHAR(255),
        "password" VARCHAR(255) NOT NULL
    );`;
const createDatabase = async () => {
    try {
        await client.connect();                            // gets connection
        await client.query('CREATE DATABASE test'); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();                                // closes connection
    }
};

createDatabase().then((result) => {
    if (result) {
        console.log('Database created');
        execute(text).then(result => {
            if (result) {
                console.log('Table created');
            }
        });
    }
});







