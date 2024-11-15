const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Route để tạo một category mới
router.post("/create_category", categoryController.createCategory);

// Route để lấy tất cả category
router.get("/list_category", categoryController.getCategories);

module.exports = router;
