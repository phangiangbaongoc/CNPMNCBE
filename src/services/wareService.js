require("dotenv").config();
const Ware = require("../models/ware"); // Đảm bảo đường dẫn và tên model đúng
const createWareService = async (
  Ware_name,
  Ware_quantity,
  Ware_unit,
  Ware_entry_date,
  Ware_export_date
) => {
  try {
    let result = await Ware.create({
      Ware_name,
      Ware_quantity,
      Ware_unit,
      Ware_entry_date,
      Ware_export_date,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getWareService = async () => {
  try {
    // Lấy tất cả kho hàng
    let result = await Ware.find({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createWareService,
  getWareService,
};
