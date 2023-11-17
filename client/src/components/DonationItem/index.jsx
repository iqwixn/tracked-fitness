import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_DONATE, UPDATE_DONATE_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const DonationItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromDonate = item => {
    dispatch({
      type: REMOVE_FROM_DONATE,
      _id: item._id
    });
    idbPromise('donate', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_DONATE,
        _id: item._id
      });
      idbPromise('donate', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_DONATE_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('donate', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromDonate(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default DonationItem;
