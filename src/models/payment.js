const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    requestId: { type: String, required: true },
    amount: { type: Number, required: true },
    orderInfo: { type: String, required: true },
    extraData: { type: String, default: "" },
    signature: { type: String, required: true },
    result: { type: Object, default: {} }, // Lưu trữ thông tin phản hồi từ MoMo
  },
  { timestamps: true }
);
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
