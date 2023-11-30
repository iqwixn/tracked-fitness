const { User, Workout, WorkoutSet, WorkoutPlan } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    user: async (parent, args, context) => {
      console.log(" ads d "+context.user);
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'workoutPlans',
          populate: {
            path: 'workouts',
            populate: {
              path: 'workout'
            }
          }
        });
        console.log("in user resolver, USER: "+user)
        return user;
      }

      throw AuthenticationError;
    },

    // Query for getting all workouts
    workouts: async () => {
      return Workout.find();
    },

    // Query for getting a workout by ID
    workout: async (parent, { _id }) => {
      return Workout.findById(_id);
    },

    workoutSet: async (parent, { _id }) => {
      return WorkoutSet.findById(_id).populate('workout');
    },

    workoutSets: async () => {
      return WorkoutSet.find().populate('workout');
    },

    workoutPlan: async (parent, { _id }) => {
      return WorkoutPlan.findById(_id).populate({
        path: 'workouts',
        populate: {
          path: 'workout'
        }
      });
    },

    workoutPlans: async () => {
      return WorkoutPlan.find().populate({
        path: 'workouts',
        populate: {
          path: 'workout'
        }
      });
    },
  },

  Mutation: {
    // Mutation for creating a new workout
    addWorkout: async (parent, args) => {
      return Workout.create(args);
    },

    // Mutation for updating a workout
    updateWorkout: async (parent, { _id, ...args }) => {
      return Workout.findByIdAndUpdate(_id, args, { new: true });
    },

    // Mutation for deleting a workout
    deleteWorkout: async (parent, { _id }) => {
      return Workout.findByIdAndDelete(_id);
    },

    // Mutation for creating a new workout set
    addWorkoutSet: async (parent, args) => {
      return WorkoutSet.create({
        name: args.name,
        workout: args.workout,
        reps: args.reps,
      });
    },

    // Mutation for updating a workout set
    updateWorkoutSet: async (parent, { _id, ...args }) => {
      return WorkoutSet.findByIdAndUpdate(_id, args, { new: true }).populate('workout');
    },

    // Mutation for deleting a workout set
    deleteWorkoutSet: async (parent, { _id }) => {
      return WorkoutSet.findByIdAndDelete(_id);
    },

    // Mutation for creating a new workout plan
    addWorkoutPlan: async (parent, args) => {
      return WorkoutPlan.create({
        name: args.name,
        workouts: args.workouts,

      });
    },


    // Mutation for updating a workout plan
    updateWorkoutPlan: async (parent, { _id, ...args }) => {
      return WorkoutPlan.findByIdAndUpdate(_id, args, { new: true }).populate({
        path: 'workouts',
        populate: {
          path: 'workout'
        }
      });
    },


    // Mutation for deleting a workout plan
    deleteWorkoutPlan: async (parent, { _id }) => {
      return WorkoutPlan.findByIdAndDelete(_id);
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {            //-=-=-=-=add user=-=-=-=-=
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
}

module.exports = resolvers;
