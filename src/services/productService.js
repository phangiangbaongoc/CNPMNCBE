const Product = require("../models/product");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      Food_name,
      Price,
      Food_picture,
      categoryID, // Newly added field
      Food_status, // Newly added field, optional since it defaults to 'Hết'
    } = newProduct;

    try {
      // Create a new product
      const createdProduct = await Product.create({
        Food_name,
        Price,
        Food_picture,
        categoryID, // Save the category ID
        Food_status, // Save the food status (optional)
      });

      if (createdProduct) {
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdProduct,
        });
      }
    } catch (e) {
      return reject({
        status: "ERR",
        message: e.message,
      });
    }
  });
};

const updateProduct = (productId, updatedFields) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return resolve({
          status: "ERR",
          message: "Product not found",
        });
      }

      // Update product fields
      Object.keys(updatedFields).forEach((key) => {
        product[key] = updatedFields[key];
      });

      const updatedProduct = await product.save();

      if (updatedProduct) {
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: updatedProduct,
        });
      }
    } catch (e) {
      return reject({
        status: "ERR",
        message: e.message,
      });
    }
  });
};

// const getAllProduct =  () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const products = await Product.aggregate([
//         {
//           $lookup: {
//             from: "stores",
//             localField: "Store_id", // Kiểm tra tên trường
//             foreignField: "_id",
//             as: "storeInfo",
//           },
//         },
//         {
//           $lookup: {
//             from: "categories",
//             localField: "categoryID", // Kiểm tra tên trường
//             foreignField: "_id",
//             as: "categoryInfo",
//           },
//         },
//         {
//           $project: {
//             Food_name: 1,
//             Price: 1,
//             Food_detail: 1,
//             Food_picture: 1,
//             Store_id: 1,
//             storeName: { $arrayElemAt: ["$storeInfo.storeName", 0] }, // Lấy tên cửa hàng
//             categoryName: { $arrayElemAt: ["$categoryInfo.categoryName", 0] }, // Lấy tên danh mục
//           },
//         },
//       ]);

//       if (products && products.length > 0) {
//         return resolve({
//           status: "OK",
//           message: "SUCCESS",
//           data: products,
//         });
//       } else {
//         return reject({
//           status: "ERR",
//           message: "No products found",
//         });
//       }
//     } catch (e) {
//       return reject({
//         status: "ERR",
//         message: e.message,
//       });
//     }
//   });
// };

const getAllProduct = async () => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $project: {
          Food_name: 1,
          Price: 1,
          Food_picture: 1,
          categoryName: { $arrayElemAt: ["$categoryInfo.categoryName", 0] },
        },
      },
    ]);

    if (!products || products.length === 0) {
      throw new Error("No products found");
    }

    return {
      status: "OK",
      message: "SUCCESS",
      data: products,
    };
  } catch (error) {
    throw new Error(error.message || "Error retrieving products");
  }
};

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return resolve({
          status: "ERR",
          message: "Product not found",
        });
      }

      return resolve({
        status: "OK",
        message: "Product deleted successfully",
      });
    } catch (e) {
      return reject({
        status: "ERR",
        message: e.message,
      });
    }
  });
};
module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  deleteProduct,
};
