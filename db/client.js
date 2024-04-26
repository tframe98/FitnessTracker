const {Client} = require('pg');
require('dotenv').config();

//use an enviroment variable for for the connection string for flexability
const connectionString= process.env.DATABASE_URL || 'postgres://localhost5432/fitness-tracker';
const client = new Client({
  connectionString: process.env.DATABASE_URL
});


//connect to the database 
client.connect(err => {
  if (err) {
    console.error('connection error:', err.stack);
  }else {
    console.log('connected to the database');
  }
});
module.exports = client;