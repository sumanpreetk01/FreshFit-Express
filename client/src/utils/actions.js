import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  GET_CART_ITEMS,
  GET_ORDER_HISTORY,
  GET_MENU_ITEMS,
} from "./queries";
import { calculateTotals, formatCurrency } from "./helpers";

export const addToCartAction = (itemId) => {
  const [addToCart] = useMutation(ADD_TO_CART);

  return addToCart({
    variables: { itemId },
    refetchQueries: [{ query: GET_CART_ITEMS }],
  });
};

export const removeFromCartAction = (itemId) => {
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);

  return removeFromCart({
    variables: { itemId },
    refetchQueries: [{ query: GET_CART_ITEMS }],
  });
};

export const placeOrderAction = (orderInput) => {
  const [placeOrder] = useMutation(PLACE_ORDER);

  return placeOrder({
    variables: { input: orderInput },
    refetchQueries: [{ query: GET_ORDER_HISTORY }],
  });
};

export const getMenuItems = () => {
  return useQuery(GET_MENU_ITEMS);
};

export const getCartItems = () => {
  return useQuery(GET_CART_ITEMS);
};

export const getOrderHistory = () => {
  return useQuery(GET_ORDER_HISTORY);
};

export const formatCurrency = (amount) => {
  return formatCurrency(amount);
};

export const calculateTotals = (items) => {
  return calculateTotals(items);
};
