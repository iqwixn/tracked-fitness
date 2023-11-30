import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_WORKOUT_PLAN } from '../utils/mutations';
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUT_SETS } from "../utils/queries";
import { Card } from 'antd';
import Auth from '../utils/auth';


function Add_Workout_Plan(props) {
  const { loading, data } = useQuery(QUERY_WORKOUT_SETS);
  const [availableWorkoutSets, setAvailableWorkoutSets] = useState([]);

  const [formState, setFormState] = useState({ name: 'Name', workouts: 'abc123', createdAt:'4:20pm' });
  const [addWorkoutPlan] = useMutation(ADD_WORKOUT_PLAN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addWorkoutPlan({
      variables: {
        name: formState.name,
        workouts: formState.workouts,
        createdAt: formState.createdAt       
      },
    });
    const token = mutationResponse.data.addWorkoutPlan.token;
    Auth.login(token);
  };
  
  useEffect(() => {
    // Fetch workouts when the component is loaded
    setAvailableWorkoutSets(data?.workoutSets || []);

  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    
  };

  if(loading){
    return(
    <div>loading</div>
    )
  }

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
      <h2>Add Workout</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Workout Plan Name:</label>
          <input
            placeholder="Workout"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
        <label htmlFor="workout">Workout Sets:</label>
          <ul>
              {availableWorkoutSets.map(workoutSet => 
                <dl key={workoutSet._id} >
                  <input type='checkbox' name='workouts' value={workoutSet._id} onChange={handleChange} />           
                  {workoutSet.name}
                  <dd>{workoutSet.reps}</dd>
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

export default Add_Workout_Plan;
