import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Add_Exercise from './pages/NewExercise.jsx';
import Add_Workout from './pages/NewWorkoutSet.jsx';
import Add_Workout_Plan from './pages/NewWorkoutPlan.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Home />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },{
        path: '/newexercise',
        element: <Add_Exercise />
      }, {
        path: '/newworkout',
        element: <Add_Workout/>
      },{
        path: '/newworkoutplan',
        element: <Add_Workout_Plan/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
