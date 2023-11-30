import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_WORKOUT_SET } from '../utils/mutations';
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS } from "../utils/queries";
import { Card } from 'antd';
import Auth from '../utils/auth';




function Add_Workout(props) {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const [availableWorkouts, setAvailableWorkouts] = useState([]);

  const [formState, setFormState] = useState({ name: 'Name', workout: 'abc123', reps:'reps' });
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
    const token = mutationResponse.data.addWorkoutSet.token;
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


  return (
    <div className="container my-1">
      <Link to="/">← Go to Home</Link>
      <Card title="Add Workout"
    bordered
    style={{
      background: "linear-gradient(#735d4d, #45322e)",
      border: "solid #45322e",
      
      textAlign:"center"
    }}
  >
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
            name="reps"
            type="reps"
            id="reps"
            onChange={handleChange}
          />
        </div> 
        <div className="block">
        <label htmlFor="workout">Exercises:</label>
          <ul>
              {availableWorkouts.map(exercises => 
                <dl key={exercises._id} >
                  <input type='radio' name='workout' value={exercises._id} onChange={handleChange} />           
                  {exercises.name}
                  <dd>{exercises.description}</dd>
                </dl>
              )}
          </ul>
        </div> 
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      </Card>
    </div>
  );
}

export default Add_Workout;
