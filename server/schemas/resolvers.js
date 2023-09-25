const {Category, Item, Order, User} = require ('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');



const resolvers = {
    Query: {
        categories: async ()=> {
            return await Category.find();
        },
        items: async (parent, {category, name}) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex:name
                };
            }
        
        return await Item.find(params).populate('category');
    },
    item : async (parent, {_id}) => {
        return await Item.findById(_id).populate('category');
    },

        user: async (parent, args, context) => {
        if (context.user) {
            const user = await User.findById(context.user._id).populate({
                path: 'orders.items',
                populate: 'category'
            });

            user.orders.sort((a,b) => b.purchaseDate- a.purchaseDate);   
        return user;
         }
         throw new AuthenticationError('Not logged in')
    },
    order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.items',
            populate: 'category'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ items: args.items });
        const line_items = [];
  
        const { items } = await order.populate('items');
  
        for (let i = 0; i < items.length; i++) {
          const item = await stripe.items.create({
            name: items[i].name,
            description: items[i].description,
            images: [`${url}/images/${items[i].image}`]
          });
  
          const price = await stripe.prices.create({
            item: item.id,
            unit_amount: items[i].price * 100,
            currency: 'usd',
          });
  
          line_items.push({
            price: price.id,
            quantity: 1
          });
        }
  
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`
        });
  
        return { session: session.id };
      }
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      addOrder: async (parent, { items }, context) => {
        console.log(context);
        if (context.user) {
          const order = new Order({ items });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateItem: async (parent, { _id, quantity }) => {
        const decrement = Math.abs(quantity) * -1;
  
        return await Item.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      }
    }
  };
  
  module.exports = resolvers;



