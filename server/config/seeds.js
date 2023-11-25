const db = require('./connection');
const { User, Workout, WorkoutSet, WorkoutPlan } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await cleanDB('Workout', 'workouts');
  await cleanDB('WorkoutSet', 'workoutSets');
  await cleanDB('WorkoutPlan', 'workoutPlans');

  const workouts = await Workout.insertMany([
    {
      name: 'Barbell Benchpress',
      description: 'Activate key muscle groups with our Barbell Bench Press module, emphasizing proper form by engaging feet, glutes, and shoulder blades for optimal stability, while harnessing leg drive to amplify your chest workout intensity.'
    },
    {
      name: 'Incline Benchpress Machine',
      description: 'Target your upper chest effectively with the Incline Bench Press Machine, ensuring stability and engagement with controlled leg drive and proper shoulder-blade positioning.'
    },
    {
      name: 'Pectoral Fly',
      description: 'Isolate and sculpt your chest muscles with Pectoral Fly, a controlled resistance exercise that specifically targets the pectoralis major, enhancing chest definition and strength.'
    },
    {
      name: 'Chest Cable Fly',
      description: 'Refine your chest definition through precise muscle targeting with Chest Cable Fly, a resistance exercise designed to isolate the pectoral muscles, promoting strength and enhancing overall chest development.'
    },
    {
      name: 'Decline Bench Press',
      description: 'Intensify your lower chest workout with Decline Bench Press, a powerful exercise that targets the lower pectoral muscles, promoting enhanced strength and definition for a well-rounded chest.'
    },
    {
      name: 'Tricep Pulldown',
      description: 'Isolate and strengthen your triceps with Tricep Pulldown, a dynamic cable exercise that hones in on the back of your arms, promoting muscle definition and improved upper body strength.'
    }
  ]);

  const workoutSets = await WorkoutSet.insertMany([
    {
      name: 'Barbell Benchpress',
      workout: workouts[0]._id,
      reps: '4 x 10'
    },
    {
      name: 'Incline Benchpress Machine',
      workout: workouts[1]._id,
      reps: '4 x 8'
    },
    {
      name: 'Pectoral Fly',
      workout: workouts[2]._id,
      reps: '5 x 10'
    },
    {
      name: 'Chest Cable Fly',
      workout: workouts[3]._id,
      reps: '4 x 12'
    },
    {
      name: 'Decline Bench Press',
      workout: workouts[4]._id,
      reps: '4 x 8'
    },
    {
      name: 'Tricep Pulldown',
      workout: workouts[5]._id,
      reps: '4 x 12'
    }
  ]);

  const workoutPlans = await WorkoutPlan.insertMany([
    {
      name: 'Push Day 11/16/23',
      workouts: [workoutSets[0]._id, workoutSets[1]._id, workoutSets[2]._id, workoutSets[3]._id, workoutSets[4]._id, workoutSets[5]._id],
      createdAt: '11/16/23'
    }
  ])

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    workoutPlans: [workoutPlans[0]]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});