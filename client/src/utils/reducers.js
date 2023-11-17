import {
  ADD_TO_DONATE,
  REMOVE_FROM_DONATE,
} from './actions';

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.

    case ADD_TO_DONATE:{
      return {
        ...state,
        donateOpen: true,
        donate: [...state.donate, action.product],
      };
    }
 
    // First we iterate through each item in the cart and check to see if the `product._id` matches the `action._id`
    // If so, we remove it from our cart and set the updated state to a variable called `newState`
    case REMOVE_FROM_DONATE:{
      let newState = state.donate.filter((product) => {
        return product._id !== action._id;
      });
      // Then we return a copy of state and check to see if the cart is empty.
      // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
      return {
        ...state,
        donateOpen: newState.length > 0,
        donate: newState,
      };
    }


    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};
