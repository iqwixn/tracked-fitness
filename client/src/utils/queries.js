import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query getUser {
    user {
      _id
      firstName
      lastName
      email
      workoutPlans {
        _id
        name
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
  query getWorkoutSets {
    workoutSets {
      _id
      name
      workout {
        _id
      }
      reps
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
  query getWorkoutPlans {
    workoutPlans {
      _id
      name
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

export const QUERY_WORKOUT_PLAN = gql`
  query getWorkoutPlan($_id: ID!) {
    workoutPlan(_id: $_id) {
      _id
      name
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