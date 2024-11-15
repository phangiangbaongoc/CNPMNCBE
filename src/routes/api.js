const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} = require("../controllers/userController");
// const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const delay = require("../middlewares/delay");
// const { createStaff, getStaff } = require("../controllers/staffController");
// const { createWare, getWare } = require("../controllers/wareController");
// const {
//   getOrderStats,
//   createOrder,
// } = require("../controllers/orderController");

const routerAPI = express.Router();
// Áp dụng middleware `auth` cho tất cả các route
routerAPI.use(auth);
// routerAPI.get("*", auth);
routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});
// có đóng mở ngoặc đang thực thi, không có () đang gọi tới
// Định nghĩa route cho các hành động người dùng
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);
// Định nghĩa route cho các hành động nhân viên
// routerAPI.post("/staff", createStaff);
// routerAPI.get("/liststaff", getStaff);

// Định nghĩa route cho thống kê đơn hàng
// routerAPI.post("/warehouse", createOrder);
// routerAPI.get("/orders/stats", getOrderStats); // Thêm API thống kê đơn hàng

module.exports = routerAPI; //export default
