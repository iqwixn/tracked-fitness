import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_WORKOUT_SET } from '../utils/mutations';
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS } from "../utils/queries";

function Add_Workout(props) {
  const [formState, setFormState] = useState({ name: '', reps:'' });
  const [addWorkout] = useMutation(ADD_WORKOUT_SET);
  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const { loading, data } = useQuery(QUERY_WORKOUTS);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addWorkout({
      variables: {
        name: formState.name,
        workout: formState.workout,
        reps: formState.reps,
      },
    });
    const token = mutationResponse.data.addWorkout.token;
    Auth.login(token);
  };

  useEffect(() => {
    // Fetch workouts when the component is loaded
    setAvailableWorkouts(data?.workouts || []);
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //console.log(data.workouts.length)

  return (
    <div className="container my-1">
      <Link to="/">← Go to Home</Link>

      <h2>Add Workout</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Workout Name:</label>
          <input
            placeholder="Workout"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="reps">Number of Reps:</label>
          <input
            placeholder="Reps"
            name="Reps"
            type="Reps"
            id="Reps"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="reps">Exercise:</label>
          <ul>
              {availableWorkouts.map((workout) => (
                <li><button key={workout._id}>{workout.name}</button></li>
              ))}
          </ul>
        </div> 
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Add_Workout;
