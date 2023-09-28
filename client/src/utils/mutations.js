import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($input: OrderInput!) {
    placeOrder(input: $input) {
      id
      date
      totalAmount
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      item {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
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
