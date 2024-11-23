// const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   quantity: { type: Number, default: 1 },
// });

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [cartItemSchema],
// });

// module.exports = mongoose.model("Cart", cartSchema);
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  staff_id: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalItems: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", CartSchema);
