const {Category, Item, Order, User} = require ('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');



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
        console.log("context" + context.req.rawHeaders[1]);
        console.log("-----------------------------------------------------------------------------------");
        for (let key in context.req) {
          // console.log(key + "; ;;;;;;;;;;;;;;;;;");
          // if (context.hasOwnProperty(key)) {
          //   console.log(key + ";;;;;;;;;;;;;;;;;;");
          //   console.log(context[key]);
          // }
        }
        const url = new URL(context.req.rawHeaders[1]);
        console.log("------------------------------ -------------------------------------------------------" + url);
        const order = new Order({ Item: args.items });
        console.log(order);
        const line_items = [];
  
        const { Item } = await order.populate('Item');
        for (let i = 0; i < Item.length; i++) {
          
          const item = await stripe.products.create({
            name: Item[i].name,
            description: Item[i].description,
            
          });
          const price = await stripe.prices.create({
            product: item.id,
            unit_amount: parseFloat(Item[i].price) * 100 ,
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
          success_url: `http://${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://${url}/`
        });
  
        return { session: session.id };
      }
    },
    //   checkout: async (parent, args, context) => {
    //     const url = new URL(context.headers.referer).origin;
    //   // We map through the list of products sent by the client to extract the _id of each item and create a new Order.

    //   await Order.create({ items: args.items.map(({ _id }) => _id) });
    //   const line_items = [];

    //   for (const item of args.products) {
    //     line_items.push({
    //       price_data: {
    //         currency: 'usd',
    //         item_data: {
    //           name: item.name,
    //           description: item.description,
    //           images: [`${url}/images/${item.image}`],
    //         },
    //         unit_amount: item.price * 100,
    //       },
    //       quantity: item.purchaseQuantity,
    //     });
    //   }

  
    //     const session = await stripe.checkout.sessions.create({
    //       payment_method_types: ['card'],
    //       line_items,
    //       mode: 'payment',
    //       success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //       cancel_url: `${url}/`
    //     });
  
    //     return { session: session.id };
    //   }
    // },
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



