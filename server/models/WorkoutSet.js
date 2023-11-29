const mongoose = require('mongoose');
const { Schema } = mongoose;

const workoutSetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'workout',
  },
  reps: {
    type: String,
    required: true,
    trim: true
  }
});

const WorkoutSet = mongoose.model('WorkoutSet', workoutSetSchema);

module.exports = WorkoutSet;
