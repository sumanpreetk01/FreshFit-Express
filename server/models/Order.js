const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
