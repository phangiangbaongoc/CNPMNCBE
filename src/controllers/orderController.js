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
const mongoose = require("mongoose");
const axios = require("axios");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log dữ liệu đầu vào
    // Kiểm tra xem req.body có chứa các trường cần thiết không
    const { items, totalItems, totalPrice } = req.body;

    // if (!Array.isArray(items) || items.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Items must be an array and cannot be empty." });
    // }

    const newOrder = await orderService.createOrder({
      items,
      totalItems,
      totalPrice,
    });
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
    // Tạo yêu cầu thanh toán MoMo
    // const momoResponse = await createMoMoPayment(newOrder);

    // if (momoResponse.resultCode === 0) {
    //   return res.status(200).json({
    //     message: "Order created and MoMo payment initiated successfully",
    //     order: newOrder,
    //     momoPayment: momoResponse,
    //   });
    // } else {
    //   return res.status(400).json({
    //     message: "Order created, but MoMo payment failed",
    //     order: newOrder,
    //     momoError: momoResponse,
    //   });
    // }
  } catch (err) {
    console.error("Error creating order:", err.message); // Log lỗi chi tiết
    res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
};

// Lấy toàn bộ danh sách đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};
// Lấy chi tiết một đơn hàng

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra id có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const order = await orderService.getOrderById(id);
    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(404).json({ message: "Order not found", error: error.message });
  }
};
// const createMoMoPayment = async (order) => {
//   const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
//   const partnerCode = "YOUR_PARTNER_CODE";
//   const accessKey = "YOUR_ACCESS_KEY";
//   const secretKey = "YOUR_SECRET_KEY";
//   const requestId = `${partnerCode}-${Date.now()}`;
//   const orderId = `ORDER-${order._id}`;
//   const redirectUrl = "http://localhost:3000/payment/success"; // URL thành công
//   const ipnUrl = "http://localhost:8080/api/payment/notify"; // URL nhận thông báo
//   const amount = order.totalPrice.toString();
//   const requestType = "captureWallet";

//   // Tạo chuỗi dữ liệu cần ký
//   const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=Thanh toán đơn hàng&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
//   const signature = crypto
//     .createHmac("sha256", secretKey)
//     .update(rawSignature)
//     .digest("hex");

//   const requestBody = {
//     partnerCode,
//     accessKey,
//     requestId,
//     amount,
//     orderId,
//     orderInfo: "Thanh toán đơn hàng",
//     redirectUrl,
//     ipnUrl,
//     extraData: "",
//     requestType,
//     signature,
//   };

//   try {
//     const response = await axios.post(endpoint, requestBody);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating MoMo payment:", error);
//     throw new Error("Failed to create MoMo payment");
//   }
// };

module.exports = { createOrder, getAllOrders, getOrderById };
