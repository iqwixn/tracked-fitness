import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout($name: String!, $description: String) {
    addWorkout(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation updateWorkout($_id: ID!, $name: String, $description: String) {
    updateWorkout(_id: $_id, name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const DELETE_WORKOUT = gql`
  mutation deleteWorkout($_id: ID!) {
    deleteWorkout(_id: $_id) {
      _id
      name
      description
    }
  }
`;

export const ADD_WORKOUT_SET = gql`
  mutation addWorkoutSet($name: String!, $workout: ID!, $reps: String) {
    addWorkoutSet(name: $name, workout: $workout, reps: $reps) {
      _id
      name
      workout {
        _id
      }
      reps
    }
  }
`;

export const UPDATE_WORKOUT_SET = gql`
  mutation updateWorkoutSet($_id: ID!, $name: String, $workout: ID, $reps: String) {
    updateWorkoutSet(_id: $_id, name: $name, workout: $workout, reps: $reps) {
      _id
      name
      workout {
        _id
      }
      reps
    }
  }
`;

export const DELETE_WORKOUT_SET = gql`
  mutation deleteWorkoutSet($_id: ID!) {
    deleteWorkoutSet(_id: $_id) {
      _id
      name
      workout {
        _id
      }
      reps
    }
  }
`;

export const ADD_WORKOUT_PLAN = gql`
  mutation addWorkoutPlan($name: String!, $workouts: [ID]! ) {
    addWorkoutPlan(name: $name, workouts: $workouts) {
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

export const UPDATE_WORKOUT_PLAN = gql`
  mutation updateWorkoutPlan($_id: ID!, $name: String, $workouts: [ID]) {
    updateWorkoutPlan(_id: $_id, name: $name, workouts: $workouts) {
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

export const DELETE_WORKOUT_PLAN = gql`
  mutation deleteWorkoutPlan($_id: ID!) {
    deleteWorkoutPlan(_id: $_id) {
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