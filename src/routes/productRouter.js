const express = require("express");
const upload = require("../middlewares/upload");

const {
  createProduct,
  updateProduct,
  getAllProduct,
  deleteProduct,
} = require("../controllers/productController");
const routerAPI = express.Router();

// Định nghĩa route cho sản phẩm
routerAPI.post("/create_product", upload.single("image"), createProduct);
routerAPI.put("/update_product/:id", updateProduct);
routerAPI.get("/list_product", getAllProduct);
routerAPI.delete("/delete_product", deleteProduct); // Thêm route xóa sản phẩm

module.exports = routerAPI;
