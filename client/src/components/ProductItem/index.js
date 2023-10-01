import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import useStyles from './styles';
import './cards.css';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state
  const classes = useStyles();

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        item: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
   
    <Card className={classes.root}>
      <Link to={`/items/${_id}`}>
      <CardMedia className={classes.media} image={`/images/${image}`} title={name} />
        <img
          alt={name}
          src={`/images/${image}`}
        /> 
         <p>{name}</p>
      </Link>
      
      <CardContent className='media'>
      <div className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2"
        style={{ marginRight: '25px' }}>
          ${price}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {quantity}{pluralize(" item", quantity)} in stock
        </Typography>
      </div>
    </CardContent>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div> 
         <span>${price}</span>
      </div>

      <button className="cart-button" onClick={addToCart}>Add to cart</button>
    </Card>
   
  );
}

export default ProductItem;
