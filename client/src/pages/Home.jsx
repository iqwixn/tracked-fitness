import Auth from "../utils/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS, QUERY_USER } from "../utils/queries";
import axios from "axios";
import { Button, Card, Space, DatePicker, Col, Row } from "antd";
import { Link } from "react-router-dom";


const Home = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);

  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [userWorkoutPlans, setUserWorkoutPlans] = useState([]);
  const [mostRecentWorkoutPlan, setMostRecentWorkoutPlan] = useState(null);
  const [controlledDate, setControlledDate] = useState(null);
  const onChange = (date) => {
    setControlledDate(date);
  };

  useEffect(() => {
    // Fetch workouts when the component is loaded
    setAvailableWorkouts(data?.workouts || []);
  }, [data]);

  useEffect(() => {
    // Fetch workout plans for the current user when the component is loaded
    setUserWorkoutPlans(userData?.user?.workoutPlans || []);

    //console.log(userData?.user?.workoutPlans);
  }, [userData]);

  useEffect(() => {
    // Find the most recent workout plan
    if (userWorkoutPlans.length > 0) {
      const sortedWorkoutPlans = [...userWorkoutPlans].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      setMostRecentWorkoutPlan(sortedWorkoutPlans[0]);
    }
  }, [userWorkoutPlans]);

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
              "74a73f418emsh8c325d7f91bb73bp128dcajsn3884fc5f12c2",
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

  if (Auth.loggedIn()) {
    return (
      <div className="homeParent">
        <div className="welcomeMessage">
          <h1>Welcome!</h1>

          <p id="Quote">{dailyQuote?.text}</p>
          <p id="Author">{dailyQuote?.author && `- ${dailyQuote.author}`}</p>
        </div>
        <div className="lastWorkout">

          <h1>Your Last Workout</h1>
          {mostRecentWorkoutPlan && (
            <>
              <p>{mostRecentWorkoutPlan.name}</p>
              <ul>
                {mostRecentWorkoutPlan.workouts.map((workoutSet) => (
                  <li key={workoutSet._id}>
                    <p>{workoutSet.name}</p>
                    <p>{`Reps: ${workoutSet.reps}`}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <Row>
          <Col span={12}>
            <Space direction="horizontal" align="center">
              <Card
                title="Your Last Workout"
                style={{
                
                  background: "linear-gradient(#ceeded, #24bdff)",
                  border: "solid lightblue",
                  margin: "0 0 0 10px",
                }}
              >
                <DatePicker value={controlledDate} onChange={onChange} />
                <Button type="primary">Last Workout</Button>
              </Card>
            </Space>
          </Col>
          <Col span={12}>
            <Card
              title="Your Next Workout"
              bordered
              style={{

                background: "linear-gradient(#ceeded, #24bdff)",
                border: "solid lightblue",
                margin: "0 0 0 20px",
              }}
            >
              <div className="nextWorkout">
                <h1>Your Next Workout</h1>
                <Button type="primary">Create Workout</Button>
                <Link to="/newexercise">New Exercise!</Link>
                <Link to="/newworkout">New Workout!</Link>
                <Link to ="/newworkoutplan">New Workout Plan!</Link>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
      
        <Col span={12}>
          <Card
          title="Your Workout History"
            style={{
             
              background: "linear-gradient(#ceeded, #24bdff)",
              border: "solid lightblue",
              margin: "0 0 0 10px",
            }}
          >
            <div className="workoutHistory">
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
        <Col span={12}>
        <Card
          title="Available Workouts"
          style={{
            
            background: "linear-gradient(#ceeded, #24bdff)",
            border: "solid lightblue",
            margin: "0 0 0 10px",
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
