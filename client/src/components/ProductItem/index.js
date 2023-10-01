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

      </Link>
      
      <CardContent className='media'style={{ width: '200px', height:'200px'}}>
      <div className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2"style={{textAlign: 'center'}}>
          {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2"
        style={{ marginLeft: '30px', display: 'flex', flexDirection: "colunmn" }}>
          ${price}
        </Typography>

      </div>
    </CardContent>
 

      <button className="cart-button" onClick={addToCart}>Add to cart</button>
    </Card>
   
  );
}

export default ProductItem;
