const express = require('express');
const router = express.Router();

const routinesActivities = [
  {id: 1, routines_id: 1, activity_id: 1, count: 5},
  {id: 2, routines_id: 2, activity_id: 2, count: 1}
];

router.get('/', async(req, res)=>{
  res.json(routinesActivities);
});

router.post  ('/', async (req, res) => {
  const { routines_id, activity_id, count } = req.body;
  const newRoutineActivity = {
    id: routinesActivities.length + 1, 
    routines_id, 
    activity_id,
    count
  };
  routinesActivities.push(newRoutineActivity);
  res.status(201).json(newRoutineActivity);
});

module.exports = router;