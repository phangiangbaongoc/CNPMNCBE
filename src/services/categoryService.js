const Category = require("../models/categoryModel");

// Kiểm tra category đã tồn tại hay chưa
const checkCategoryExists = async (categoryName) => {
  return await Category.findOne({ categoryName });
};

// Lưu category mới vào cơ sở dữ liệu
const saveCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

module.exports = {
  checkCategoryExists,
  saveCategory,
};
