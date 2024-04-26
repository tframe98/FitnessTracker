const { Client } = require ('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

const dropTables = async () => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS routines_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    
    `);
    console.log('Tables dropped successfully');
  } catch (err) {
    console.error('Error dropping tables:', err);
  }
};

const createTables  = async () => {
  try {
    await client.query(`
    CREATE TABLE activities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    );

    CREATE TABLE routines (
      id SERIAL PRIMARY KEY,
      is_public BOOLEAN NOT NULL,
      name VARCHAR(255) NOT NULL,
      goal TEXT NOT NULL
    );

    CREATE TABLE routines_activities (
      id SERIAL PRIMARY KEY,
      routine_id INTEGER REFERENCES routines(id),
      activity_id INTEGER REFERENCES activities(id),
      count INTEGER NOT NULL
    );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

const seedTables = async () => {
  try {
    await client.query(`
    INSERT INTO activities (name, description ) VALUES
    ('SOCCER', '11 vs 11 person sport'),
    ('BASKETBALL', '5 vs 5 person sport'),
    ('RUNNING', 'An all man for themselves sport'),
    ('SWIMMING', 'an all man for themselves sport, but in water');

    INSERT INTO routines (name, is_public, goal) VALUES
    ('First Routine', true, 'A long distance sport'),
    ('Second Routine', false, 'A short distance sport'),
    ('Third Routine', true, 'Another long distance sport),
    ('Fourth Routine', true, 'A fun water sport),

    INSERT INTO routines_activities (routines_id, activity_id, count) VALUES
    (1, 1, 30),
    (2, 2, 30);
    (3, 3, 20);
    (4, 4, 15);

    `);
    console.log('Data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};


const main = async () => {
  try {
    await client.connect();
    console.log()
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

main();



