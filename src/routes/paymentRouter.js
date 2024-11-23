const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/payment", paymentController.createPayment);
router.post("/callback::");
module.exports = router;
