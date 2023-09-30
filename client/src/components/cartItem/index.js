import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import trashIcon from '../../assets/trash.png'
import './style.css'

const CartItem = ({ item }) => {

  const [state, dispatch] = useStoreContext();


  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === "") {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: "",
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: "" });
    } else if (value === "0" || value === 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      const newValue = parseInt(value);
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: isNaN(newValue) ? "" : newValue,
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: isNaN(newValue) ? "" : newValue });
    }
  };
  

  return (
    <div className="cart-item-card">
      <div className='cart-item-image'>
        <img
          src={`/images/${item.image}`}
          alt={item.name}
        />
      </div>
      <div>
        <div className='cart-item-info'>
          <h5>{item.name}</h5> 
          <h6>{item.price}</h6>
        </div>
        <div className='card-actions'>
          <span>Qty:</span>
        <div className="card-buttons">
          <button type="button" onClick={() => onChange({ target: { value: item.purchaseQuantity - 1 } })}>-</button>
          <input
            type="text"
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder="1"
            className='number-input'
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <button type="button" onClick={() => onChange({ target: { value: item.purchaseQuantity + 1 } })}>+</button>
           <img
           className='trash-icon'
            src={trashIcon}
            alt="Trash"
            style={{ cursor: 'pointer' }}
            onClick={() => removeFromCart(item)}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
