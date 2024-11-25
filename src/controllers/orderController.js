// const Order = require("../models/order.js"); // Model Order cần được định nghĩa trước

// // Hàm lấy thống kê đơn hàng
// const createOrder = async (req, res) => {
//   const { totalSales, orderCount, day, month, year } = req.body;
//   const data = await createStaffService(
//     totalSales,
//     orderCount,
//     day,
//     month,
//     year
//   );
//   return res.status(200).json(data);
// };
// const getOrderStats = async (req, res) => {
//   try {
//     const stats = await Order.aggregate([
//       {
//         $group: {
//           _id: {
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" },
//           },
//           totalSales: { $sum: "$amount" },
//           orderCount: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1 } },
//     ]);
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching order stats" });
//   }
// };

// module.exports = { getOrderStats, createOrder };
const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log dữ liệu đầu vào
    // Kiểm tra xem req.body có chứa các trường cần thiết không
    const { items, totalItems, totalPrice, staff_id } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items must be an array and cannot be empty." });
    }

    const newOrder = await orderService.createOrder({
      items,
      totalItems,
      totalPrice,
      staff_id,
    });
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error("Error creating order:", err); // Log lỗi chi tiết
    res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", err);
    res
      .status(400)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

module.exports = { createOrder, getAllOrders };
