const StaffService = require("../services/staffService");
const mongoose = require("mongoose");
const Staff = require("../models/staff");
// const {
//   createStaffService,
//   getStaffService,
//   getStaffById,
//   updateStaff,
//   deleteStaff,
// } = require("../services/staffService");

const createStaff = async (req, res) => {
  try {
    const {
      Staff_name,
      Staff_birthday,
      Staff_sex,
      Staff_phone,
      Staff_email,
      Staff_address,
      Staff_status,
      Staff_image,
    } = req.body;
    const data = await StaffService.createStaffService(
      Staff_name,
      Staff_birthday,
      Staff_sex,
      Staff_phone,
      Staff_email,
      Staff_address,
      Staff_status,
      Staff_image
    );
    console.log(data); // Kiểm tra dữ liệu trả về
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getStaff = async (req, res) => {
  const data = await StaffService.getStaffService();
  return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
};
const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid staff ID",
      });
    }

    const staff = await StaffService.getStaffById(id);

    if (!staff) {
      return res.status(404).json({
        status: "ERR",
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      status: "OK",
      data: staff,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid staff ID",
      });
    }

    // Validate input data (có thể thêm kiểm tra cụ thể)
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "ERR",
        message: "No data provided for update",
      });
    }

    const updatedStaff = await StaffService.updateStaff(id, updateData);

    if (!updatedStaff) {
      return res.status(404).json({
        status: "ERR",
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Staff updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid staff ID",
      });
    }

    // Call service to delete product
    const result = await StaffService.deleteStaff(id);

    if (result.status === "ERR") {
      return res.status(404).json(result); // Product not found
    }

    // Trả về phản hồi gọn hơn
    return res.status(200).json({
      status: "OK",
      message: "Staff deleted successfully",
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
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
