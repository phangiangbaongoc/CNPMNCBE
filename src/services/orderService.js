const mongoose = require("mongoose");
const Order = require("../models/order");
const createOrder = async (items, totalItems, totalPrice, staff_id) => {
  try {
    let result = await Order.create({
      items,
      totalItems,
      totalPrice,
      staff_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// class OrderService {
//   async createOrder(data) {
//     const { items, totalItems, totalPrice, staff_id } = data;

//     // Kiểm tra xem items có phải là mảng không và không rỗng
//     if (!Array.isArray(items) || items.length === 0) {
//       throw new Error("Items must be an array and cannot be empty.");
//     }

//     // Chuyển đổi các ID thành ObjectId
//     const processedItems = items.map((item) => ({
//       productId: new mongoose.Types.ObjectId(item.productId), // Sử dụng 'new' ở đây
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     const order = new Order({
//       items: processedItems,
//       totalItems,
//       totalPrice,
//       staff_id: new mongoose.Types.ObjectId(staff_id),
//     });

//     return await order.save();
//   }

//   // Thêm các hàm khác nếu cần, ví dụ: lấy danh sách đơn hàng
//   async getAllOrders() {
//     return await Order.find().populate("items.productId").populate("staff_id");
//   }
// }
module.exports = { createOrder };
// module.exports = new OrderService();
