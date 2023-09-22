const {gql} = require ('apollo-server-express');

const typeDefs = gql`

type User {
    _id : ID!
    firstName: String!
    lastName: String!
    email: String!
}

type Category {
    _id:ID!
    name:String!
}

type Item {
    _id: ID!
    name: String!
    description: String!
    image: String!
    quantity: Int
    price: Float
    category: Category
}

type Order {
    _id: ID!
    purchaseDate: String!
    items: [Item]
    Users: [User]
    
}`;

module.exports = typeDefs;
