const crypto = require("crypto");
const https = require("https");

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

module.exports = { createPayment };
