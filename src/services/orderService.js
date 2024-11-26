// const mongoose = require("mongoose");
// const Order = require("../models/order");
// const createOrder = async (items, totalItems, totalPrice, staff_id) => {
//   try {
//     let result = await Order.create({
//       items,
//       totalItems,
//       totalPrice,
//       staff_id,
//     });
//     return result;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
const mongoose = require("mongoose");
const Order = require("../models/order");

const createOrder = async ({ items, totalItems, totalPrice }) => {
  try {
    // Kiểm tra và chuyển đổi các ID thành ObjectId nếu cần
    const processedItems = items.map((item) => ({
      // productId: new mongoose.Types.ObjectId(item.productId), // Thêm 'new' trước mongoose.Types.ObjectId
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    const newOrder = new Order({
      items: processedItems,
      totalItems,
      totalPrice,
    });
    // const result = await order.save(); // Lưu đơn hàng vào database
    // return result;
    return await newOrder.save();
  } catch (error) {
    console.error("Error in createOrder:", error.message); // Log lỗi chi tiết
    throw new Error("Failed to create order");
  }
};
// Lấy toàn bộ danh sách đơn hàng
const getAllOrders = async () => {
  try {
    const orders = await Order.find().populate(
      "items.productId",
      "Food_name Price Food_picture Food_status"
    ); // Lấy thông tin sản phẩm
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};
// Lấy chi tiết một đơn hàng
const getOrderById = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("Invalid ObjectId");
  }
  try {
    const order = await Order.findById(orderId).populate(
      "items.productId",
      "Food_name Price Food_picture Food_status"
    );

    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw new Error("Failed to fetch order by ID");
  }
};

module.exports = { createOrder, getAllOrders, getOrderById };
