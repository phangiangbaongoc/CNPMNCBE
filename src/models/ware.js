const mongoose = require("mongoose");

const wareSchema = new mongoose.Schema(
  {
    Ware_name: { type: String, required: true },
    Ware_quantity: { type: Number, required: true },
    Ware_unit: { type: String, required: true }, // enum: ["kg", "pcs", "liters"]
    Ware_entry_date: { type: Date, required: true, default: Date.now },
    Ware_export_date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Ware = mongoose.model("Ware", wareSchema);

module.exports = Ware;
