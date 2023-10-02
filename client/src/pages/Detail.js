import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Button } from "@material-ui/core";

import Cart from "../components/cart/index.js";
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import  '../pages/css/details.css';
function Detail() {
  //set up Redux functionality

  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  // the useState hook is used to create a currentItem state variable, which will hold the details of the currently selected product.

  const [currentItem, setCurrentItem] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { items, cart } = state;

  useEffect(() => {
    // already in global store

    if (items.length) {
      setCurrentItem(items.find((item) => item._id === id));
    }

    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        items: data.items,
      });

      data.items.forEach((item) => {
        idbPromise("items", "put", item);
      });
    }

    // get cache from idb
    else if (!loading) {
      idbPromise("items", "get").then((indexedItems) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          items: indexedItems,
        });
      });
    }
  }, [items, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        item: { ...currentItem, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentItem, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentItem._id,
    });

    idbPromise("cart", "delete", { ...currentItem });
  };

  return (
    <div>
      {currentItem && cart ? (
        <div  style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>
          <Link to="/menu" style={{ marginBottom: "10px", textDecoration: "none" }}>
            ← Back to Menu
          </Link>

          <h2 className="header-title" style={{ fontSize: "24px", margin: "20px 0" }}>{currentItem.name}</h2>

          <img src={`/images/${currentItem.image}`} 
             alt={currentItem.name} 
             style={{ width: "500px", height: "auto", margin: "10px" }}/>

          <p style={{ margin: "10px", paddingBottom: "20px" }}>{currentItem.description}</p>

          <div style={{ display: "flex", justifyContent: "center",  alignItems: "center",}}>
            <strong style={{ marginRight: "10px" }}>Price:</strong><p style={{ marginRight: "10px" }}>${currentItem.price}{" "}</p>
            <Button style={{ backgroundColor: "#2e5136", color: "#fff", marginRight: "5px" }} variant="contained" onClick={addToCart}>
              Add to Cart
            </Button>
            <Button
              style={{ backgroundColor: "#2e5136", color: "#fff", marginLeft: "5px" }}
              variant="contained"
              disabled={!cart.find((p) => p._id === currentItem._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </Button>
          </div>

          {/* <img src={`/images/${currentItem.image}`} 
             alt={currentItem.name} /> */}
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </div>
  );
}

export default Detail;
