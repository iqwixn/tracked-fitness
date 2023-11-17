const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: Text,
    required: false
  },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
