const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/create", createOrder);
router.get("/list", getAllOrders);

module.exports = router;
