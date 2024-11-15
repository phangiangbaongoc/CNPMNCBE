// const { Category, Product } = require("../models/product");

// const {
//   createProductService,
//   getProductService,
// } = require("../services/productService");

// const createProduct = async (req, res) => {
//   const { name, category, price, description } = req.body;
//   const image = req.file; // Gán giá trị cho biến image từ req.file

//   //Kiểm tra nếu image có giá trị
//   if (!image) {
//     return res.status(400).json({ message: "Image is required." });
//   }
//   const data = await createProductService(
//     image,
//     name,
//     category,
//     price,
//     description
//   );
//   return res.status(200).json(data);
// };

// const getProduct = async (req, res) => {
//   const data = await getProductService();
//   return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
// };

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// };
// module.exports ={
//   createProduct,
//   getProduct,
//   deleteProduct,
// };
const ProductService = require("../services/ProductService");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    const {
      Food_name,
      Price,
      Food_picture,
      categoryID, // Added categoryID field
      Food_status, // Added Food_status field, default to 'Hết'
    } = req.body;
    // Loại bỏ dấu cách thừa ở đầu và cuối giá trị Food_status
    const trimmedFoodStatus = Food_status.trim();

    // Kiểm tra giá trị hợp lệ của Food_status
    if (!["Còn", "Hết"].includes(trimmedFoodStatus)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid Food_status value. Valid values are 'Còn' or 'Hết'.",
      });
    }

    // Check for missing required fields
    if (!Food_name || !Price || !Food_picture || !categoryID || !Food_status) {
      return res.status(400).json({
        status: "ERR",
        message:
          "Missing required fields: Food_name, Food_detail, Price, Food_picture,Food_status, categoryID",
      });
    }

    // Call the service to create a new product
    const result = await ProductService.createProduct({
      Food_name,
      Price,
      Food_picture,
      categoryID, // Pass categoryID to service
      Food_status: trimmedFoodStatus, // Pass Food_status to service
    });

    return res.status(201).json(result); // Return 201 for resource creation
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // Validate product ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid product ID",
      });
    }

    // Call the service to update the product
    const result = await ProductService.updateProduct(id, updatedFields);

    if (result.status === "ERR") {
      return res.status(404).json(result); // Return 404 if product not found
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const result = await ProductService.getAllProduct();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid product ID",
      });
    }

    const result = await ProductService.deleteProduct(id);

    if (result.status === "ERR") {
      return res.status(404).json(result); // Return 404 if product not found
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  deleteProduct,
};
