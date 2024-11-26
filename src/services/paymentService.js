const crypto = require("crypto");
const https = require("https");
// var accessKey = "F8BBA842ECF85";
// var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const createPayment = async (paymentData) => {
  const {
    accessKey = "F8BBA842ECF85",
    secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz",
    amount = "50000",
    orderInfo = "pay with MoMo",
    partnerCode = "MOMO",
    redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b",
    ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b",
    lang = "vi",
  } = paymentData;

  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = "";
  const requestType = "payWithMethod";

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture: true,
    extraData,
    signature,
  });

  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(requestBody);
    req.end();
  });
};
// Hàm kiểm tra trạng thái giao dịch từ MoMo
const getTransactionStatus = async (orderId) => {
  try {
    const partnerCode = "MOMO";
    const requestId = `query_${Date.now()}`;
    const rawSignature = `accessKey=F8BBA842ECF85&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;
    const signature = crypto
      .createHmac("sha256", "K951B6PE1waDMi640xX08PD3vg6EkVlz")
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      accessKey: "F8BBA842ECF85",
      requestId,
      orderId,
      signature,
    };

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/query",
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // Trả về dữ liệu từ MoMo
  } catch (error) {
    console.error("Error fetching transaction status:", error.message);
    throw new Error("Unable to fetch transaction status");
  }
};

// Hàm lấy trạng thái giao dịch từ database (nếu không gọi MoMo)
const getLocalTransactionStatus = async (orderId) => {
  const transaction = await Payment.findOne({ orderId });
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  return {
    orderId: transaction.orderId,
    status: transaction.result.resultCode === 0 ? "SUCCESS" : "FAILED",
    amount: transaction.amount,
    message: transaction.result.message || "Status retrieved",
  };
};

module.exports = {
  createPayment,
  getTransactionStatus,
  getLocalTransactionStatus,
};
