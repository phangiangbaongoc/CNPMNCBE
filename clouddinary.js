const cloudinary = require("cloudinary").v2;
// import { v2 as cloudinary } from "cloudinary";re
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
console.log(process.env.CLOUD_NAME);
module.exports = cloudinary;
