const mongoose = require("mongoose");

const wareSchema = new mongoose.Schema({
  Ware_name: { type: String, required: true },
  Ware_quantity: { type: Number, required: true },
  Ware_unit: { type: String, required: true },
  Ware_entry_date: { type: Date, required: true },
  Ware_export_date: { type: Date, required: true },
  // Other fields as necessary
});

const Ware = mongoose.model("Ware", wareSchema);

module.exports = Ware;
