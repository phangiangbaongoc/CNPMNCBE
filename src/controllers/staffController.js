const {
  createStaffService,
  getStaffService,
} = require("../services/staffService");
const StaffService = require("../services/staffService");
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

module.exports = {
  createStaff,
  getStaff,
};
