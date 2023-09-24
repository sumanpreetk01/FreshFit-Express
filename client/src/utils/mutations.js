import { gql } from "@apollo/client";

export const PLACE_ORDER = gql`
  mutation PlaceOrder($input: OrderInput!) {
    placeOrder(input: $input) {
      id
      date
      totalAmount
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($itemId: String!) {
    addToCart(itemId: $itemId) {
      id
      name
      price
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: String!) {
    removeFromCart(itemId: $itemId) {
      id
      name
      price
    }
  }
`;
