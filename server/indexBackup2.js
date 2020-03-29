const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool, Client } = require('pg');
const pool = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
  });
  
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });





// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get('/', (req, res) => {
    // callback - checkout a client
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
      })
    })
  res.send('Hi');
});

app.get('/values/all', async (req, res) => {
//   const values = await pgClient.query('SELECT * from values');

//   res.send(values.rows);
});

app.listen(5000, err => {
  console.log('Listening');
});
