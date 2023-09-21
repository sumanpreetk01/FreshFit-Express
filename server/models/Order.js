const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  Item: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }

  ],
  User: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
    
  ]
});

const Order = model('Order', OrderSchema);

module.exports = Order;