import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../cartItem/index.js';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import cartIcon from '../../assets/cart.png'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
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
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, items: [...cart]});
        }
        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
          sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
      }

      // function submitCheckout() {
      //   console.log(...state.cart)
      //   getCheckout({
      //     variables: { 
      //       items: [...state.cart],
      //     },
      //   });
      // }
      function submitCheckout() {
        const itemIds = [];
    
        state.cart.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            itemIds.push(item._id);
          }
        });
    console.log(itemIds);
        getCheckout({
          variables: { items: itemIds },
        });
      }

      if (!state.cartOpen) {
        return (
          <div className="cart-closed" onClick={toggleCart}>
            <img className='cart-icon' src={cartIcon} alt='shopping cart'/>
          </div>
        );
      }

      return (
        <div className='cart-container'>
          <button className='close-button' onClick={toggleCart}>
            close
          </button>
          <h2>Cart</h2>
          {state.cart.length ? (
            <div>
              {state.cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
    
              <div className='total-section'>
                <strong>Total: ${calculateTotal()}</strong>
    
                {Auth.loggedIn() ? (
                  <button className='checkout-button' onClick={submitCheckout}>Checkout</button>
                ) : (
                  <span>(log in to check out)</span>
                )}
              </div>
            </div>
          ) : (
            <h3 className='empty-cart-message'>
              There's nothing in your cart!
            </h3>
          )}
        </div>
      );
};

export default Cart;