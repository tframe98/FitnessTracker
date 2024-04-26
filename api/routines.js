const express = require('express');
const router = express.Router();

const routines = [
  {id: 1, is_public: true, name:"Soccer", goal: "30 minutes of ball control" },
  {id: 2, is_public: false, name:"Basketball", goal: "30 minutes of shooting" },
];

router.get('/', async (req, res) => {
  res.json(routines);
});

router.get('/:routineId', async (req, res) => {
  const routine = routines.find(rt => rt.id === parseInt(req.params.routineId));
  if (routine) {
    res.json(routine);
  } else {
    res.status(404).send('Routine not found');
  }
});

router.post('/', async(req, res) =>{
  const newRoutine = {
    id:routines.length + 1,
    is_public: req.body.is_public,
    name: req.body.names,
    goal: req.body.goal
  };
  routines.push(newRoutine);
  res.status(201).json(newRoutine);
});

router.delete('/:routineId', async (req, res) =>{
  const index = routines.findIndex(rt => rt.id === parseInt(req.params.routineID));
  if (index > -1 ) {
    const deleted = routines.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).send('Routine not found');
  }
});

module.exports = router;