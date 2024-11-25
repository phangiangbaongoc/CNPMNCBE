// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const orderSchema = new Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     cart: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         name: {
//           type: String,
//           required: true,
//         },
//         image: {
//           type: String,
//           required: true,
//         },
//         description: {
//           type: String,
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     deliveryInfo: {
//       name: {
//         type: String,
//         required: true,
//       },
//       phone: {
//         type: String,
//         required: true,
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     totalShip: {
//       type: Number,
//       required: true,
//     },
//     storeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Store",
//       required: true,
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Chưa thanh toán", "Đã thanh toán"],
//       default: "Chưa thanh toán",
//     },
//     status: {
//       type: String,
//       enum: [
//         "Đang tìm tài xế",
//         "Đã tìm thấy tài xế",
//         "Cửa hàng đang chuẩn bị",
//         "Đang giao",
//         "Hoàn thành",
//         "Đã hủy",
//       ],
//       default: "Đang tìm tài xế",
//     },
//     driverId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Driver",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;
// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   staff_id: { type: String, required: true },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Product",
//       },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//     },
//   ],
//   totalItems: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Order", OrderSchema);
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Refers to Product collection
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  items: [itemSchema],
  totalItems: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
});

module.exports = mongoose.model("Order", orderSchema);
