const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions));

app.use(express.json());

const port = 3000;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Honeyb321!!!',
    port: 5432,
});

client.connect(error => {
    if (error) {
        console.error('error connecting to PostgresSQL', error.stack);
    }
    else {
        console.log('connected to PostgresSQL');
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});