const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    Food_name: { type: String, required: true, trim: true },
    Price: { type: Number, required: true, min: 0 },
    Food_picture: { type: String, required: true, trim: true },
    Food_status: {
      type: String,
      enum: ["Còn", "Hết"],
      default: "Còn",
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId, // Sử dụng ObjectId để liên kết với ToppingGroup
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;
