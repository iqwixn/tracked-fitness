import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User {
  user {
    _id
    email
    firstName
    lastName
    workoutPlans {
      _id
      createdAt
      name
      workouts {
        _id
        name
        reps
        workout {
          _id
          description
          name
        }
      }
    }
  }
}
`;

export const QUERY_WORKOUTS = gql`
  query getWorkouts {
    workouts {
      _id
      name
      description
    }
  }
`;

export const QUERY_WORKOUT = gql`
  query getWorkout($_id: ID!) {
    workout(_id: $_id) {
      _id
      name
      description
    }
  }
`;

export const QUERY_WORKOUT_SETS = gql`
query WorkoutSets {
  workoutSets {
    _id
    name
    reps
    workout {
      _id
      description
      name
    }
  }
}
`;

export const QUERY_WORKOUT_SET = gql`
  query getWorkoutSet($_id: ID!) {
    workoutSet(_id: $_id) {
      _id
      name
      workout {
        _id
      }
      reps
    }
  }
`;

export const QUERY_WORKOUT_PLANS = gql`
query WorkoutPlans {
  workoutPlans {
    _id
    createdAt
    name
    workouts {
      _id
      name
      reps
      workout {
        _id
        description
        name
      }
    }
  }
}
`;

export const QUERY_WORKOUT_PLAN = gql`
  query getWorkoutPlan($_id: ID!) {
    workoutPlan(_id: $_id) {
      _id
      name
      createdAt
      workouts {
        _id
        name
        workout {
          _id
          name
          description
        }
        reps
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;