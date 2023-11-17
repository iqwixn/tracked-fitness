import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// import DonationItem from '../DonationItem';
import DonationItem from '../DonationItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_DONATE, ADD_MULTIPLE_TO_DONATE } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const Donataion
const Donate = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getDonate() {
      const cart = await idbPromise('donate', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_DONATE, products: [...donate] });
    }

    if (!state.cart.length) {
      getDonate();
    }
  }, [state.donate.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_DONATE });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="donate-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          ❤️
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Donation</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            // DonationItem
            <DonationItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Donate</button>
            ) : (
              <span>(log in to donate)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added a donation yet!
        </h3>
      )}
    </div>
  );
};

// export default Donation;
export default Donate;
