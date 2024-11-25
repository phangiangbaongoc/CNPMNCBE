const express = require("express");
const upload = require("../middlewares/upload");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductById,
} = require("../controllers/productController");
const routerAPI = express.Router();

// Định nghĩa route cho sản phẩm
routerAPI.post("/create_product", createProduct);
routerAPI.get("/list_product", getProduct);
routerAPI.get("/detail_product/:id", getProductById);
routerAPI.put(
  "/update_product/:id",
  // upload.single("Food_picture"),
  updateProduct
);
routerAPI.delete("/delete_product/:id", deleteProduct);
// Thêm route xóa sản phẩm

module.exports = routerAPI;
