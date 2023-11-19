

const Home = () => {
  if (Auth.loggedIn()){
    return (
      <div className="container">
            <h1>Welcome!</h1>
            <p>Your last work out was:    an embarassment, you can do better.</p>
            <p>"It's not about being the strongest person in the room, it's about being the person that never gave up."</p>
            <p>-Eddy Hall</p>
      </div>
    );
  }
  if(!Auth.loggedIn()){
    return(
      <div>
        <h1>Please login or sign up!</h1>
      </div>
    )
  }

  return(
    <div>
      
    </div>
  )
};

export default Home;
