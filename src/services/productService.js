const Product = require("../models/product");
const createProductService = async (
  Food_name,
  Price,
  Food_picture,
  categoryID, // Newly added field
  Food_status
) => {
  try {
    let result = await Product.create({
      Food_name,
      Price,
      Food_picture,
      categoryID, // Newly added field
      Food_status,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProductService = async () => {
  try {
    const product = await Product.aggregate([
      {
        $project: {
          Food_name: 1,
          Price: 1,
          Food_detail: 1,
          Food_picture: 1,
          Store_id: 1,
        },
      },
    ]);

    if (!product || product.length === 0) {
      throw new Error("No product found");
    }

    return {
      status: "OK",
      message: "SUCCESS",
      data: product,
    };
  } catch (error) {
    throw new Error(error.message || "Error retrieving product");
  }
};
// const getProductById = async (id) => {
//   try {
//     const product = await Product.findById(id);
//     return product; // Trả về null nếu không tìm thấy
//   } catch (error) {
//     throw new Error(error.message || "Error fetching product");
//   }
// };
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).populate("categoryID"); // Populate để lấy thông tin chi tiết category nếu cần
    if (!product) {
      return {
        status: "ERR",
        message: "Product not found",
      };
    }
    return {
      status: "OK",
      message: "Product found successfully",
      data: product,
    };
  } catch (error) {
    throw new Error(error.message || "Error fetching product");
  }
};
// const updateProduct = async (id, updateData) => {
//   try {
//     // Tùy chọn `new: true` để trả về dữ liệu sau khi cập nhật
//     const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     return updatedProduct; // Trả về null nếu không tìm thấy
//   } catch (error) {
//     throw new Error(error.message || "Error updating product");
//   }
// };
const updateProduct = async (productId, updatedFields) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return {
        status: "ERR",
        message: "Product not found",
      };
    }

    // Cập nhật thông tin sản phẩm
    Object.keys(updatedFields).forEach((key) => {
      product[key] = updatedFields[key];
    });

    const updatedProduct = await product.save();

    return {
      status: "OK",
      message: "Product updated successfully",
      data: updatedProduct,
    };
  } catch (error) {
    throw new Error(error.message || "Error updating product");
  }
};
const deleteProduct = async (productId) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return {
        status: "ERR",
        message: "Product not found",
      };
    }

    // Trả về thông tin của sản phẩm đã xóa
    return {
      status: "OK",
      message: "Product deleted successfully",
      data: product,
    };
  } catch (error) {
    throw new Error(error.message || "Error deleting product");
  }
};

module.exports = {
  createProductService,
  getProductService,
  getProductById,
  updateProduct,
  deleteProduct,
};
