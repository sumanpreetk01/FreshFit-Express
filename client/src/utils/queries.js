import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
query categories {
  categories {
    _id
    name
  }
}
`;
export const QUERY_PRODUCTS = gql`
query getProducts($category: ID) {
  items(category: $category) {
    _id
    name
    description
    price
    quantity
    image
    category {
      _id
    }
  }
}
`;


export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        item {
          _id
          name
          description
          image
          price
          quantity
        }
      }
    }
  }
`;


export const GET_ORDER_HISTORY = gql`
  query GetOrderHistory {
    orderHistory {
      id
      date
      totalAmount
      item {
        id
        name
        price
        quantity
      }
    }
  }
`;
export const QUERY_CHECKOUT = gql`
  query getCheckout($item: [ItemInput]) {
    checkout(item: $item) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    items {
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
`;
