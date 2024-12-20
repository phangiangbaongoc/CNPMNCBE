const Staff = require("../models/staff");
const createStaffService = async (
  Staff_name,
  Staff_birthday,
  Staff_sex,
  Staff_phone,
  Staff_email,
  Staff_address,
  Staff_status,
  Staff_image
) => {
  try {
    let result = await Staff.create({
      Staff_name,
      Staff_birthday,
      Staff_sex,
      Staff_phone,
      Staff_email,
      Staff_address,
      Staff_status,
      Staff_image,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// const getStaffService = async () => {
//   dùng try catch để trong trường hợp có lỗi sẽ báo lỗi
// try {
//   // check staff phone
//   const staff = await Staff.findOne({ Staff_phone });
//   if (staff) {
//     console.log(
//       ">>> số điện thoại đã có, vui lòng nhập số điện thoại khác",
//       Staff_phone
//     );
//     return null;
//   }
//   // truyền biến rỗng mục đích lấy tất cả người dùng về
//   let result = await Staff.find({}); // select("-password") lấy dữ liệu về trừ password
//   return result;
// } catch (error) {
//   console.log(error);
//   return null;
// }
// };
const getStaffService = async () => {
  try {
    const staff = await Staff.aggregate([
      {
        $project: {
          Staff_name: 1,
          Staff_birthday: 1,
          Staff_sex: 1,
          Staff_phone: 1,
          Staff_email: 1,
          Staff_address: 1,
          Staff_status: 1,
          Staff_image: 1,
        },
      },
    ]);

    if (!staff || staff.length === 0) {
      throw new Error("No staff found");
    }

    return {
      status: "OK",
      message: "SUCCESS",
      data: staff,
    };
  } catch (error) {
    throw new Error(error.message || "Error retrieving staff");
  }
};
// const getStaffById = async (id) => {
//   try {
//     const staff = await Staff.findById(id);
//     return staff; // Trả về null nếu không tìm thấy
//   } catch (error) {
//     throw new Error(error.message || "Error fetching product");
//   }
// };
const getStaffById = async (staffId) => {
  try {
    const staff = await Staff.findById(staffId); // Populate để lấy thông tin chi tiết category nếu cần
    if (!staff) {
      return {
        status: "ERR",
        message: "Staff not found",
      };
    }
    return {
      status: "OK",
      message: "Staff found successfully",
      data: staff,
    };
  } catch (error) {
    throw new Error(error.message || "Error fetching staff");
  }
};
const updateStaff = async (staffId, updatedFields) => {
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return {
        status: "ERR",
        message: "Staff not found",
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

const deleteStaff = async (productId) => {
  try {
    const staff = await Staff.findByIdAndDelete(staffId);
    if (!staff) {
      return {
        status: "ERR",
        message: "Staff not found",
      };
    }

    // Trả về thông tin của sản phẩm đã xóa
    return {
      status: "OK",
      message: "Staff deleted successfully",
      data: staff,
    };
  } catch (error) {
    throw new Error(error.message || "Error deleting staff");
  }
};
module.exports = {
  createStaffService,
  getStaffService,
  getStaffById,
  updateStaff,
  deleteStaff,
};
