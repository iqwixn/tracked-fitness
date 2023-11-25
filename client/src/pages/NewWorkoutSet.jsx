import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_WORKOUT_SET } from '../utils/mutations';

function Add_Workout(props) {
  const [formState, setFormState] = useState({ name: '', workout: '', reps:'' });
  const [addWorkout] = useMutation(ADD_WORKOUT_SET);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/Home">← Go to Home</Link>

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
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Workout:</label>
          <input
            placeholder="Workout"
            name="Workout"
            type="Workout"
            id="Workout"
            onChange={handleChange}
          />
        </div> */}
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
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Add_Workout;
