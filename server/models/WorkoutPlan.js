const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  workouts: [{
    type: Schema.Types.ObjectId,
    ref: 'WorkoutSet',
    required: true
  }],
  createdAt: {
    type: String,
    required: true
  }
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;
