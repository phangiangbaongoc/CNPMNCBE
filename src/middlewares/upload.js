const multer = require("multer");
const path = require("path");

// Định nghĩa cấu hình lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu trữ
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên tệp
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
