const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const workoutPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  workouts: [{
    type: Schema.Types.ObjectId,
    ref: 'WorkoutSet',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;
