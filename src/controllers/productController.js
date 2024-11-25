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
const Product = require("../models/product");
// const createProduct = async (req, res) => {
//   try {
//     const {
//       Food_name,
//       Price,
//       Food_picture,
//       categoryID, // Added categoryID field
//       Food_status, // Added Food_status field, default to 'Hết'
//     } = req.body;
//     // Loại bỏ dấu cách thừa ở đầu và cuối giá trị Food_status
//     const trimmedFoodStatus = Food_status.trim();

//     // Kiểm tra giá trị hợp lệ của Food_status
//     if (!["Còn", "Hết"].includes(trimmedFoodStatus)) {
//       return res.status(400).json({
//         status: "ERR",
//         message: "Invalid Food_status value. Valid values are 'Còn' or 'Hết'.",
//       });
//     }

//     // Check for missing required fields
//     if (!Food_name || !Price || !Food_picture || !categoryID || !Food_status) {
//       return res.status(400).json({
//         status: "ERR",
//         message:
//           "Missing required fields: Food_name, Food_detail, Price, Food_picture,Food_status, categoryID",
//       });
//     }

//     // Call the service to create a new product
//     const result = await ProductService.createProduct({
//       Food_name,
//       Price,
//       Food_picture,
//       categoryID, // Pass categoryID to service
//       Food_status: trimmedFoodStatus, // Pass Food_status to service
//     });

//     return res.status(201).json(result); // Return 201 for resource creation
//   } catch (e) {
//     return res.status(500).json({
//       status: "ERR",
//       message: e.message,
//     });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedFields = req.body;

//     // Validate product ID format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: "ERR",
//         message: "Invalid product ID",
//       });
//     }

//     // Call the service to update the product
//     const result = await ProductService.updateProduct(id, updatedFields);

//     if (result.status === "ERR") {
//       return res.status(404).json(result); // Return 404 if product not found
//     }

//     return res.status(200).json(result);
//   } catch (e) {
//     return res.status(500).json({
//       status: "ERR",
//       message: e.message,
//     });
//   }
// };
const createProduct = async (req, res) => {
  try {
    const {
      Food_name,
      Price,
      Food_picture,
      categoryID, // Added categoryID field
      Food_status,
    } = req.body;
    const data = await ProductService.createProductService(
      Food_name,
      Price,
      Food_picture,
      categoryID, // Added categoryID field
      Food_status
    );
    console.log(data); // Kiểm tra dữ liệu trả về
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getProduct = async (req, res) => {
  const data = await ProductService.getProductService();
  return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
};
// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate product ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: "ERR",
//         message: "Invalid product ID",
//       });
//     }

//     const product = await ProductService.getProductById(id);

//     if (!product) {
//       return res.status(404).json({
//         status: "ERR",
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       status: "OK",
//       data: product,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "ERR",
//       message: error.message,
//     });
//   }
// };
// Lấy thông tin sản phẩm cụ thể qua ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid product ID",
      });
    }

    const result = await ProductService.getProductById(id);

    if (result.status === "ERR") {
      return res.status(404).json(result); // Sản phẩm không tìm thấy
    }

    return res.status(200).json(result); // Trả về thông tin sản phẩm
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Validate product ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: "ERR",
//         message: "Invalid product ID",
//       });
//     }

//     // Validate input data (có thể thêm kiểm tra cụ thể)
//     if (!updateData || Object.keys(updateData).length === 0) {
//       return res.status(400).json({
//         status: "ERR",
//         message: "No data provided for update",
//       });
//     }

//     const updatedProduct = await ProductService.updateProduct(id, updateData);

//     if (!updatedProduct) {
//       return res.status(404).json({
//         status: "ERR",
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       status: "OK",
//       message: "Product updated successfully",
//       data: updatedProduct,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "ERR",
//       message: error.message,
//     });
//   }
// };
// Cập nhật thông tin sản phẩm qua ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid product ID",
      });
    }

    const updatedFields = { ...req.body }; // Lấy thông tin cần cập nhật từ body
    if (req.file) {
      updatedFields.Food_picture = req.file.path; // Nếu có ảnh mới, cập nhật
    }

    const result = await ProductService.updateProduct(id, updatedFields);

    if (result.status === "ERR") {
      return res.status(404).json(result); // Sản phẩm không tìm thấy
    }

    return res.status(200).json(result); // Trả về thông tin sản phẩm sau khi cập nhật
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid product ID",
      });
    }

    // Call service to delete product
    const result = await ProductService.deleteProduct(id);

    if (result.status === "ERR") {
      return res.status(404).json(result); // Product not found
    }

    // Trả về phản hồi gọn hơn
    return res.status(200).json({
      status: "OK",
      message: "Product deleted successfully",
      data: result.data, // Trả về thông tin sản phẩm đã xóa
    });
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
