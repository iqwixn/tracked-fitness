import Auth from "../utils/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS, QUERY_USER, QUERY_WORKOUT_PLANS} from "../utils/queries";
import axios from "axios";
import { Button, Card,  Col, Row } from "antd";
import { Link } from "react-router-dom";
import Datepickerform from "../components/Datepickerform";





const Home = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const { loading: userLoading, data: userData } = useQuery(QUERY_WORKOUT_PLANS);

  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [userWorkoutPlans, setUserWorkoutPlans] = useState([]);


  useEffect(() => {
    // Fetch workouts when the component is loaded
    setAvailableWorkouts(data?.workouts || []);
    //console.log("useEffect data: "+ data)
  }, [data]);

  useEffect(() => {
    // Fetch workout plans for the current user when the component is loaded
    setUserWorkoutPlans(userData?.workoutPlans || []);

    
  }, [userData]);

  // useEffect(() => {
  //   // Find the most recent workout plan
  //   if (userWorkoutPlans.length > 0) {
  //     const sortedWorkoutPlans = [...userWorkoutPlans].sort((a, b) => {
  //       const dateA = new Date(a.createdAt);
  //       const dateB = new Date(b.createdAt);
  //       return dateB - dateA;
  //     });

  //     setMostRecentWorkoutPlan(sortedWorkoutPlans[0]);
  //   }
  // }, [userWorkoutPlans]);

  const [dailyQuote, setDailyQuote] = useState(null);

  const fetchDailyQuote = async () => {
    if (Auth.loggedIn()) {
      try {
        const options = {
          method: "GET",
          url: "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote",
          params: {
            token: "ipworld.info",
          },
          headers: {
            "X-RapidAPI-Key":
              "2778a8bb70mshdc89ff7dadfe79ap15ae15jsna4aa1dcf4d98",
            "X-RapidAPI-Host":
              "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
          },
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

  if(loading || userLoading){
    return(
    <div>loading</div>
    )
  }

  //console.log(`post load data & userData: ${data}, ${userData}`);

  if (Auth.loggedIn()) {
    return (
      <div className="homeParent">
        <div className="welcomeMessage">
          <h1>Welcome!</h1>

          <p id="Quote">{dailyQuote?.text}</p>
          <p id="Author">{dailyQuote?.author && `- ${dailyQuote.author}`}</p>
        </div>
        <Row>
          <Col xs={24} sm={12}>
              <Card
                title="Your Last Workout"
                style={{
                
                  background: "linear-gradient(#735d4d, #45322e)",
                border: "solid #45322e",
                  margin: "25px",
                }}
              >
                <Datepickerform />
                
              </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              title="Your Next Workout"
              bordered
              style={{
                background: "linear-gradient(#735d4d, #45322e)",
                border: "solid #45322e",
                margin: "25px",
              }}
            >
              <div className="nextWorkout">

                <Button type="default"><Link to="/newexercise">New Exercise!</Link></Button>
                <Button type="default"><Link to="/newworkout">New Workout!</Link></Button>
                <Button type="default"><Link to ="/newworkoutplan">New Workout Plan!</Link></Button>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12}>
            <Card
              title="Your Workout History"
              style={{
                background: "linear-gradient(#735d4d, #45322e)",
                border: "solid #45322e",
                margin: "25px",
              }}
            >
              <div className="workoutHistory ">
                {userWorkoutPlans.map((workoutPlan) => (
                  <div key={workoutPlan._id}>
                    <h2>{workoutPlan.name}</h2>
                    <ul>
                      {workoutPlan.workouts.map((workoutSet) => (
                        <li key={workoutSet._id}>
                          <p>{workoutSet.name}</p>
                          <p>{`Reps: ${workoutSet.reps}`}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              title="Available Workouts"
              style={{
                background: "linear-gradient(#735d4d, #45322e)",
                border: "solid #45322e",
                margin: "25px",
              }}
            >
              <div className="availableWorkouts">
                <ul>
                  {availableWorkouts.map((workout) => (
                    <li key={workout._id}>{workout.name}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
  if (!Auth.loggedIn()) {
    return (
      <div className="homeParent">
        <h1>Please login or sign up!</h1>
      </div>
    );
  }

  return <div></div>;
};

export default Home;
