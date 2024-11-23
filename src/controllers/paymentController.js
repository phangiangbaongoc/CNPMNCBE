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
const crypto = require("crypto");

const callback = async (req, res) => {
  console.log("callback::");
  console.log(req.body);

  try {
    // Lấy thông tin từ request body
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      resultCode,
      message,
      extraData,
      signature,
      transId,
      payType,
    } = req.body;

    // Tạo rawSignature từ request body để xác thực
    const secretKey = "YOUR_SECRET_KEY"; // Thay YOUR_SECRET_KEY bằng secret key từ MoMo
    const rawSignature = `partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&amount=${amount}&orderInfo=${orderInfo}&orderType=momo_wallet&transId=${transId}&resultCode=${resultCode}&message=${message}&payType=${payType}&extraData=${extraData}`;
    const computedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    // Xác thực chữ ký
    if (computedSignature !== signature) {
      console.error("Invalid signature!");
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Kiểm tra trạng thái giao dịch
    if (resultCode === 0) {
      console.log("Payment successful");

      // Gọi service để xử lý đơn hàng thành công
      await paymentService.processSuccessfulPayment({
        orderId,
        amount,
        transId,
      });

      // Trả phản hồi về MoMo
      return res
        .status(200)
        .json({ message: "Payment processed successfully" });
    } else {
      console.error("Payment failed:", message);

      // Gọi service để xử lý đơn hàng thất bại
      await paymentService.processFailedPayment({
        orderId,
        resultCode,
        message,
      });

      // Trả phản hồi về MoMo
      return res.status(200).json({ message: "Payment processed, but failed" });
    }
  } catch (error) {
    console.error("Callback Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createPayment, callback };

module.exports = { createPayment, callback };
