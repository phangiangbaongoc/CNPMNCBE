const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

const cloudinary = require("../../clouddinary");

// Định nghĩa cấu hình lưu trữ
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ratings", // Thư mục trên Cloudinary để lưu ảnh (có thể thay đổi)
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
