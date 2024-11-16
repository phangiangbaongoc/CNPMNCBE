const paymentService = require("../services/paymentService");

const createPayment = async (req, res) => {
  try {
    // Gọi service xử lý logic thanh toán
    const paymentResponse = await paymentService.createPayment(req.body);
    // Trả kết quả thành công về client
    res.status(200).json(paymentResponse);
  } catch (error) {
    console.error("Payment Error:", error);
    // Trả lỗi về client nếu có vấn đề xảy ra
    res.status(500).json({
      message: "Payment failed",
      error: error.message || error,
    });
  }
};

module.exports = { createPayment };
