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

// const callback = async (req, res) => {
//   console.log("Callback body received from MoMo:", req.body);
//   const {
//     partnerCode,
//     orderId,
//     requestId,
//     amount,
//     orderInfo,
//     resultCode,
//     message,
//     extraData,
//     signature,
//     transId,
//     payType,
//   } = req.body;
//   console.log("Extracted fields:", {
//     partnerCode,
//     orderId,
//     amount,
//     resultCode,
//     transId,
//   });
//   const secretKey = process.env.MOMO_SECRET_KEY; // Đưa vào biến môi trường
//   const rawSignature = `partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&amount=${amount}&orderInfo=${orderInfo}&orderType=momo_wallet&transId=${transId}&resultCode=${resultCode}&message=${message}&payType=${payType}&extraData=${extraData}`;
//   const computedSignature = crypto
//     .createHmac("sha256", secretKey)
//     .update(rawSignature)
//     .digest("hex");
//   console.log("Computed Signature:", computedSignature);
//   console.log("Received Signature:", signature);

//   if (computedSignature !== signature) {
//     return res.status(400).json({ message: "Invalid signature" });
//   }

//   if (resultCode === 0) {
//     await paymentService.processSuccessfulPayment({ orderId, amount, transId });
//     return res.status(200).json({ message: "Payment processed successfully" });
//   } else {
//     await paymentService.processFailedPayment({ orderId, resultCode, message });
//     return res.status(200).json({ message: "Payment processed, but failed" });
//   }
// };
const momoCallback = async (req, res) => {
  const { orderId, resultCode, amount } = req.body;

  console.log("Callback payload from MoMo:", req.body); // Kiểm tra dữ liệu MoMo gửi về

  if (resultCode === 0) {
    // Thanh toán thành công
    console.log(`Thanh toán thành công cho orderId: ${orderId}`);
    res.status(200).json({ message: "Thanh toán thành công" });
  } else {
    // Thanh toán thất bại
    console.log(`Thanh toán thất bại cho orderId: ${orderId}`);
    res.status(400).json({ message: "Thanh toán thất bại" });
  }
};
// Controller kiểm tra trạng thái giao dịch
const getTransactionStatus = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    // Lựa chọn: Kiểm tra từ MoMo hoặc từ database
    const transactionStatus = await paymentService.getTransactionStatus(
      orderId
    );
    // Nếu muốn lấy từ local database: dùng hàm `getLocalTransactionStatus`

    return res.status(200).json(transactionStatus);
  } catch (error) {
    console.error("Error fetching transaction status:", error.message);
    return res.status(500).json({
      message: "Failed to fetch transaction status",
      error: error.message || error,
    });
  }
};
const handleMoMoNotification = async (req, res) => {
  const { partnerCode, orderId, requestId, resultCode, message, signature } =
    req.body;

  // Xác minh chữ ký (signature)
  const rawSignature = `accessKey=YOUR_ACCESS_KEY&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&resultCode=${resultCode}`;
  const expectedSignature = crypto
    .createHmac("sha256", "YOUR_SECRET_KEY")
    .update(rawSignature)
    .digest("hex");

  if (signature === expectedSignature) {
    if (resultCode === 0) {
      // Thanh toán thành công
      await Order.findByIdAndUpdate(orderId, { status: "paid" });
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      // Thanh toán thất bại
      return res.status(400).json({ message: "Payment failed" });
    }
  } else {
    return res.status(400).json({ message: "Invalid signature" });
  }
};

module.exports = {
  createPayment,
  momoCallback,
  getTransactionStatus,
  handleMoMoNotification,
};
