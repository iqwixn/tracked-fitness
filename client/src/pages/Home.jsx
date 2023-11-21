import Auth from "../utils/auth";

const Home = () => {
  return (
    <div className="homeParent">
      {Auth.loggedIn() ? (
        <>
          <div className="welcomeMessage">
            <h1>Welcome!</h1>
            <p>Your last workout was an embarrassment, you can do better.</p>
            <p>"It's not about being the strongest person in the room, it's about being the person that never gave up."</p>
            <p>-Eddy Hall</p>
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
        </>
      ) : (
        <div className="homeParent">
          <h1>Please login or sign up!</h1>
        </div>
      )}
    </div>
  );
};

export default Home;