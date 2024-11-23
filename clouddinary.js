// const cloudinary = require("cloudinary").v2;
// // import { v2 as cloudinary } from "cloudinary";re
// require("dotenv").config();
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
// console.log(process.env.CLOUD_NAME);
// module.exports = cloudinary;
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
module.exports = cloudinary;
// console.log("Cloud Name:", process.env.CLOUD_NAME);
// console.log("API Key:", process.env.API_KEY);
// console.log("API Secret:", process.env.API_SECRET);

// cloudinary.api
//   .ping()
//   .then((response) => {
//     console.log("Cloudinary connection successful:", response);
//   })
//   .catch((err) => {
//     console.error("Cloudinary connection failed:", err);
//   });
