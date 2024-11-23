const {
  createWareService,
  getWareService,
  updateWarehouseService,
} = require("../services/wareService");
const wareService = require("../services/wareService");

const createWare = async (req, res) => {
  const {
    Ware_name,
    Ware_quantity,
    Ware_unit,
    Ware_entry_date,
    Ware_export_date,
  } = req.body;
  // const data = await createWareService(
  //   Ware_name,
  //   Ware_quantity,
  //   Ware_unit,
  //   Ware_entry_date,
  //   Ware_export_date
  // );
  // console.log(data);
  // return res.status(200).json(data);
  try {
    // Kiểm tra trường bắt buộc
    if (
      !Ware_name ||
      !Ware_quantity ||
      !Ware_unit ||
      !Ware_entry_date ||
      !Ware_export_date
    ) {
      return res
        .status(400)
        .json({ status: "Error", message: "Thiếu trường bắt buộc" });
    }

    //   const newWarehouse = {
    //     Ware_name,
    //     Ware_quantity,
    //     Ware_unit,
    //     Ware_entry_date,
    //     Ware_export_date,
    //   };
    //   const result = await createWareService(newWarehouse);
    //   res.status(201).json(result);
    // } catch (error) {
    //   console.error("Lỗi trong createWare:", error); // In chi tiết lỗi ra console
    //   res.status(500).json({ message: "Có lỗi xảy ra trên server" });
    const data = await createWareService(
      Ware_name,
      Ware_quantity,
      Ware_unit,
      Ware_entry_date,
      Ware_export_date
    );
    console.log("Created Warehouse:", data);

    return res.status(200).json({
      status: "OK",
      message: "Tạo kho thành công",
      data,
    });
  } catch (error) {
    console.error("Error in createWare:", error);
    return res.status(500).json({
      status: "ERR",
      message: "Internal Server Error",
    });
  }
};
// Lấy danh sách sản phẩm
const getWare = async (req, res) => {
  const data = await getWareService();
  return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
};
// const getAllWare = async (req, res) => {
//   try {
//     const response = await getWareService();
//     if (response.status === "ERR") {
//       return res.status(500).json(response);
//     }
//     return res.status(200).json(response);
//   } catch (error) {
//     console.error("Error in getAllWare:", error);
//     return res.status(500).json({ status: "ERR", message: error.message });
//   }
// };

module.exports = {
  createWare,
  getWare,
  // getAllWare,
};
