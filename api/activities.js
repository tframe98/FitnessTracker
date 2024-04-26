const express = require('express');
const router = express.Router();

const activities = [
  { id: 1, name:"Soccer", description: "An eleven-vs-eleven man sport"},
  { id: 2, name:"Basketball", description: "A five-vs-five man sport"},
];

router.get('/', async(req, res) =>{
  res.json(activities);
});

router.get('/:activityId', async (req, res) => {
  const activity = activities.find(act => act.id === parseInt(req.params.activityId));
  if (activity) {
    res.json(activity);
  } else {
    res.status(404).send('Activity not found');
  }
});

router.post('/', async(req, res)=>{
  const newActivity = {
    id: activities.length + 1,
    name: req.body.name,
    description: req.body.description
  };
  activities.push(newActivity);
  res.status(201).json(newActivity);
});

router.delete('/:activityId', async (req,res)=>{
  const index = activities.findIndex(act => act.id === parseInt(req.params.activityId));
  if (index > -1) {
    const deleted = activities.splice(index, 1);
    res.json(deleted[0]);
  }else {
    res.status(404).send('Activity notfound')
  }
});

module.exports = router;
