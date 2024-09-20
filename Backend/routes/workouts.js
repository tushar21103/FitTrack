const express = require('express')
const Workout = require('../models/workoutModel')
const { createWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')

const router = express.Router()

//GET all workout
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getSingleWorkout)

//POST a new workout
router.post('/', createWorkout)

//Delete a new workout
router.delete('/:id', deleteWorkout)

//update a new workout
router.patch('/:id', updateWorkout)

module.exports = router