const Order = require("../models/order.js"); // Model Order cần được định nghĩa trước

// Hàm lấy thống kê đơn hàng
const createOrder = async (req, res) => {
  const { totalSales, orderCount, day, month, year } = req.body;
  const data = await createStaffService(
    totalSales,
    orderCount,
    day,
    month,
    year
  );
  return res.status(200).json(data);
};
const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalSales: { $sum: "$amount" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order stats" });
  }
};

module.exports = { getOrderStats, createOrder };
