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

// const upload = multer({ storage: storage });
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed!"));
    } else {
      cb(null, true);
    }
  },
}).single("Food_picture"); // Nếu upload file đơn
module.exports = upload;
