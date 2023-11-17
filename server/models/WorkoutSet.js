const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  reps: {
    type: String,
    required: true,
    trim: true
  }
});

const WorkoutPlan = mongoose.model('WorkoutSet', workoutPlanSchema);

module.exports = WorkoutPlan;
