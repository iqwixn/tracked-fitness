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
              <p>Your last work out was:    an embarassment, you can do better.</p>
              <p id="Quote">{dailyQuote?.text}</p>
              <p id="Author">{dailyQuote?.author && `- ${dailyQuote.author}`}</p>
        </div>
        <div className="lastWorkout">
              <h1>Your Last Workout</h1>
              <p>You don't even have a gym membership?</p>
        </div>
        <div className="nextWorkout">
          <h1>Your Next Workout</h1>
          <p>Get a gym membership</p>

        </div>
        <div className="goals">
          <h1>Your Goals</h1>
          <p>Get huge</p>

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