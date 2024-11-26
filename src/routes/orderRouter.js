const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/create", createOrder);
router.get("/list", getAllOrders);
// Lấy chi tiết một đơn hàng
router.get("/:id", getOrderById);

module.exports = router;
