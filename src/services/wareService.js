require("dotenv").config();
const Ware = require("../models/ware"); // Đảm bảo đường dẫn và tên model đúng
const createWareService = async (newWarehouse) => {
  try {
    const {
      Ware_name,
      Ware_quantity,
      Ware_unit,
      Ware_entry_date,
      Ware_export_date,
    } = newWarehouse;

    const warehouse = new Ware({
      Ware_name,
      Ware_quantity,
      Ware_unit,
      Ware_entry_date,
      Ware_export_date,
    });

    return await warehouse.save();
  } catch (error) {
    console.error("Lỗi trong createWareService:", error); // In chi tiết lỗi ra console
    throw new Error("Không thể tạo warehouse");
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

// const updateWarehouse = (warehouseId, updatedFields) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Kiểm tra xem kho hàng có tồn tại không
//       const warehouse = await Warehouse.findById(warehouseId);
//       if (!warehouse) {
//         return resolve({
//           status: "ERR",
//           message: "Warehouse not found",
//         });
//       }

//       // Cập nhật các trường của kho hàng
//       Object.keys(updatedFields).forEach((key) => {
//         warehouse[key] = updatedFields[key];
//       });

//       const updatedWarehouse = await warehouse.save();

//       if (updatedWarehouse) {
//         return resolve({
//           status: "OK",
//           message: "SUCCESS",
//           data: updatedWarehouse,
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

module.exports = {
  createWareService,
  getWareService,
  // updateWarehouse,
};
