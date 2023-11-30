//New exercises to be used in workouts

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_WORKOUT } from '../utils/mutations';
import { Card } from 'antd';

function Add_Exercise(props) {
  const [formState, setFormState] = useState({ name: '', description: '' });
  const [addExercise] = useMutation(ADD_WORKOUT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addExercise({
      variables: {
        name: formState.name,
        description: formState.description,
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
      <Link to="/">← Go to Home</Link>
      <Card title="Your Next Workout"
    bordered
    style={{
      background: "linear-gradient(#735d4d, #45322e)",
      border: "solid #45322e",
      margin: "25px",
    }}
  >
      <h2>Add Exercise</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Exercise Name:</label>
          <input
            placeholder="Exercise"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Exercise Description:</label>
          <input
            placeholder="description"
            name="description"
            type="description"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      </Card>
    </div>
    
  );
}

export default Add_Exercise;
