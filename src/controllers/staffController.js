const {
  createStaffService,
  getStaffService,
} = require("../services/staffService");

const createStaff = async (req, res) => {
  const {
    Staff_name,
    Staff_birthday,
    Staff_sex,
    Staff_phone,
    Staff_email,
    Staff_address,
    Staff_date,
    Staff_status,
    Staff_image,
  } = req.body;
  const data = await createStaffService(
    Staff_name,
    Staff_birthday,
    Staff_sex,
    Staff_phone,
    Staff_email,
    Staff_address,
    Staff_date,
    Staff_status,
    Staff_image
  );
  console.log(data); // Kiểm tra dữ liệu trả về
  return res.status(200).json(data);
};
const getStaff = async (req, res) => {
  const data = await getStaffService();
  return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
};

module.exports = {
  createStaff,
  getStaff,
};
