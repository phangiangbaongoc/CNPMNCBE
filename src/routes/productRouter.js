const express = require("express");
const upload = require("../middlewares/upload");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");
const routerAPI = express.Router();

// Định nghĩa route cho sản phẩm
routerAPI.post("/create_product", createProduct);
routerAPI.put("/update_product/:id", updateProduct);
routerAPI.get("/list_product", getProduct);
routerAPI.delete("/delete_product/:id", deleteProduct);
// Thêm route xóa sản phẩm

module.exports = routerAPI;
