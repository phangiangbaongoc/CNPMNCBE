const {
  createWareService,
  getWareService,
  // updateWarehouse,
} = require("../services/wareService");

const createWare = async (req, res) => {
  try {
    const {
      Ware_name,
      Ware_quantity,
      Ware_unit,
      Ware_entry_date,
      Ware_export_date,
    } = req.body;

    // Kiểm tra trường bắt buộc
    if (
      !Ware_name ||
      !Ware_quantity ||
      !Ware_unit ||
      !Ware_entry_date ||
      !Ware_export_date
    ) {
      return res.status(400).json({ message: "Thiếu trường bắt buộc" });
    }

    const newWarehouse = {
      Ware_name,
      Ware_quantity,
      Ware_unit,
      Ware_entry_date,
      Ware_export_date,
    };
    const result = await createWareService(newWarehouse);
    res.status(201).json(result);
  } catch (error) {
    console.error("Lỗi trong createWare:", error); // In chi tiết lỗi ra console
    res.status(500).json({ message: "Có lỗi xảy ra trên server" });
  }
};

const getWare = async (req, res) => {
  const data = await getWareService();
  return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
};

module.exports = {
  createWare,
  getWare,
};
