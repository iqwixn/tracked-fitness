const typeDefs = `

  type Workout {
    _id: ID
    name: String
    description: String
  }

  type WorkoutSet {
    _id: ID
    name: String
    workout: Workout
    reps: String
  }

  type WorkoutPlan {
    _id: ID
    name: String
    workouts: [WorkoutSet]
    createdAt: String 
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    workoutPlans: [WorkoutPlan]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    workouts: [Workout]
    workout(_id: ID!): Workout
    workoutSets: [WorkoutSet]
    workoutSet(_id: ID!): WorkoutSet
    workoutPlans: [WorkoutPlan]
    workoutPlan(_id: ID!): WorkoutPlan
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User

    addWorkout(name: String!, description: String): Workout
    updateWorkout(_id: ID!, name: String, description: String): Workout
    deleteWorkout(_id: ID!): Workout

    addWorkoutSet(name: String!, workout: ID!, reps: String): WorkoutSet
    updateWorkoutSet(_id: ID!, name: String, workout: ID, reps: String): WorkoutSet
    deleteWorkoutSet(_id: ID!): WorkoutSet

    addWorkoutPlan(name: String!, workouts: [ID]! ): WorkoutPlan
    updateWorkoutPlan(_id: ID!, name: String, workouts: [ID]): WorkoutPlan
    deleteWorkoutPlan(_id: ID!): WorkoutPlan

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
