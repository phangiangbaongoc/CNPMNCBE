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

const createOrder = async ({ items, totalItems, totalPrice, staff_id }) => {
  try {
    // Kiểm tra và chuyển đổi các ID thành ObjectId nếu cần
    const processedItems = items.map((item) => ({
      productId: new mongoose.Types.ObjectId(item.productId), // Thêm 'new' trước mongoose.Types.ObjectId
      quantity: item.quantity,
      price: item.price,
    }));

    const order = new Order({
      items: processedItems,
      totalItems,
      totalPrice,
      staff_id: new mongoose.Types.ObjectId(staff_id), // Tương tự với staff_id
    });

    const result = await order.save(); // Lưu đơn hàng vào database
    return result;
  } catch (error) {
    console.error("Error in createOrder:", error); // Log lỗi chi tiết
    throw new Error("Failed to create order");
  }
};

module.exports = { createOrder };
