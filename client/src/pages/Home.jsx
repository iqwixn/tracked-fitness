import Auth from "../utils/auth";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
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
          <button>Create Workout</button>

        </div>
        <div className="workoutHistory">
        <h1>Your Workout History</h1>
          <button>Workout History</button>

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