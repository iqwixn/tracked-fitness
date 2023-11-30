const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
});

const Workout = mongoose.model('workout', workoutSchema);

module.exports = Workout;
