import { gql } from "@apollo/client";

export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menuItems {
      id
      name
      price
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems {
      id
      name
      price
      quantity
    }
  }
`;

export const GET_ORDER_HISTORY = gql`
  query GetOrderHistory {
    orderHistory {
      id
      date
      totalAmount
      items {
        id
        name
        price
        quantity
      }
    }
  }
`;
