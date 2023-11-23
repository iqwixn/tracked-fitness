import Auth from "../utils/auth";
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS, QUERY_USER } from '../utils/queries';
import axios from 'axios';

const Home = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);

  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [userWorkoutPlans, setUserWorkoutPlans] = useState([]);

  useEffect(() => {
    // Fetch workouts when the component is loaded
    setAvailableWorkouts(data?.workouts || []);
  }, [data]);

  useEffect(() => {
    // Fetch workout plans for the current user when the component is loaded
    setUserWorkoutPlans(userData?.user?.workoutPlans || []);
  }, [userData]);

  const [dailyQuote, setDailyQuote] = useState(null);

  const fetchDailyQuote = async () => {
    if (Auth.loggedIn()) {
      try {
        const options = {
          method: 'GET',
          url: 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote',
          params: {
            token: 'ipworld.info'
          },
          headers: {
            'X-RapidAPI-Key': '74a73f418emsh8c325d7f91bb73bp128dcajsn3884fc5f12c2',
            'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        const newQuote = {
          text: response.data.text,
          author: response.data.author,
        };

        setDailyQuote(newQuote);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchDailyQuote();
  }, [Auth.loggedIn()]);

  if (Auth.loggedIn()){
    return (
      <div className="homeParent">


        <div className="welcomeMessage">
              <h1>Welcome!</h1>

              <p id="Quote">{dailyQuote?.text}</p>
              <p id="Author">{dailyQuote?.author && `- ${dailyQuote.author}`}</p>
        </div>
        <div className="lastWorkout">
              <h1>Your Last Workout</h1>
              <button>Last Workout</button>
        </div>
        <div className="nextWorkout">
          <h1>Your Next Workout</h1>
          <button>Next Workout</button>

        </div>
        <div className="workoutHistory">
          <h1>Your Workout History</h1>
          <ul>
            {userWorkoutPlans.map((workoutPlan) => (
              <li key={workoutPlan._id}>{workoutPlan.name}</li>
            ))}
          </ul>
        </div>
        <div className="availableWorkouts">
          <h1>Available Workouts</h1>
          <ul>
            {availableWorkouts.map((workout) => (
              <li key={workout._id}>{workout.name}</li>
            ))}
          </ul>
        </div>


      </div>
    );
  }
  if(!Auth.loggedIn()){
    return(
      <div className="homeParent">
        <h1>Please login or sign up!</h1>
      </div>
    )
  }

  return(
    <div>
      
    </div>
  );
};

export default Home;