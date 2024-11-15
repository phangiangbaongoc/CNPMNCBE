const mongoose = require("mongoose");
const staffSchema = new mongoose.Schema({
  Staff_name: { type: String, required: true, trim: true },
  Staff_birthday: { type: Date, required: true },
  Staff_sex: { type: String, required: true, trim: true },
  Staff_phone: { type: Number, required: true, trim: true },
  Staff_email: { type: String, required: true, trim: true },
  Staff_address: { type: String, required: true, trim: true },
  Staff_date: { type: Date, required: true },
  Staff_status: { type: String, required: true, trim: true },
  Staff_image: { type: String, required: true, trim: true },
});
const Staff = mongoose.model("staff", staffSchema);

module.exports = Staff;
