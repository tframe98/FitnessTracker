const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {Client} = require('pg');
const client = new Client();

client.connect();

app.use(express.json());

const activitiesRouter = require('./api/activities');
const routinesRouter = require('./api/routines'); 
const routinesActivitiesRouter = require('./api/routines_activities'); 

app.delete('api/v1/activities/:activitiesId', async (req, res)=> {
  const {activityId} = req.params;

  try {
    const result = await client.query('DELETE FROM activities WHERE id = $1', [activityId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Activity not found'});
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting activity;', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.delete('/api/v1/routines/:routineId', async (req, res) => {
  const { routineId } = req.params;

  try {
    const result = await client.query('Delete FROM routines WHERE id = $1', [routineId]);
    if (result.rowCount === 0) {
      return res.status(404).json({error: 'Routine not found'});
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting routine:', error);
  } 
});


app.use('/api/v1/activities', activitiesRouter);
app.use('/api/v1/routines', routinesRouter);
app.use('/api/v1/routines_activities', routinesActivitiesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
