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

  const secretKey = process.env.MOMO_SECRET_KEY; // Đưa vào biến môi trường
  const rawSignature = `partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&amount=${amount}&orderInfo=${orderInfo}&orderType=momo_wallet&transId=${transId}&resultCode=${resultCode}&message=${message}&payType=${payType}&extraData=${extraData}`;
  const computedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  if (computedSignature !== signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  if (resultCode === 0) {
    await paymentService.processSuccessfulPayment({ orderId, amount, transId });
    return res.status(200).json({ message: "Payment processed successfully" });
  } else {
    await paymentService.processFailedPayment({ orderId, resultCode, message });
    return res.status(200).json({ message: "Payment processed, but failed" });
  }
};

module.exports = { createPayment, callback };

module.exports = { createPayment, callback };
