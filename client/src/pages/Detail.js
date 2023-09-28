import React, { useEffect, useState } from 'react';
import '../index.css'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import Cart from '../components/Cart';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_ITEM,
} from '../utils/actions';
import { QUERY_ITEM } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {

//set up Redux functionality 
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

// the useState hook is used to create a currentProduct state variable, which will hold the details of the currently selected product.

  const [currentItem, setCurrentItem] = useState({});

  const { loading, data } = useQuery(QUERY_ITEM);

  const { item, cart } = state;

  useEffect(() => {

    // already in global store

    if (item.length) {
      setCurrentItem(item.find((item) => item._id === id));
    }

    // retrieved from server

    else if (data) {
      dispatch({
        type: UPDATE_ITEM,
        item: data.item,
      });

      data.item.forEach((item) => {
        idbPromise('items', 'put', item);
      });
    }
    
    // get cache from idb
    else if (!loading) {
      idbPromise('items', 'get').then((indexedItem) => {
        dispatch({
          type: UPDATE_ITEM,
          item: indexedItem,
        });
      });
    }
  }, [item, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentItem, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentItem, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentItem._id,
    });

    idbPromise('cart', 'delete', { ...currentItem });
  };

  return (
    <>
      {currentItem && cart ? (
        <div className="container my-1">
          <Link to="/menu">← Back to Menu</Link>

          <h2 className = "header-title">{currentItem.name}</h2>

          <p>{currentItem.description}</p>

          <p>
            <strong>Price:</strong>${currentItem.price}{' '}
            <Button color='primary' variant="contained" onClick={addToCart}>Add to Cart</Button>
            <Button
              color='primary'
              variant='contained'
              disabled={!cart.find((p) => p._id === currentItem._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </Button>
          </p>

          <img
            src={`/images/${currentItem.image}`}
            alt={currentItem.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;