const express = require("express");
const StaffController = require("../controllers/staffController");

const routerAPI = express.Router();
routerAPI.post("/create_staffs", StaffController.createStaff);
routerAPI.get("/list_staffs", StaffController.getStaff);
routerAPI.get("/detail_staffs/:id", StaffController.getStaffById);
routerAPI.put("/update_staffs/:id", StaffController.updateStaff);
routerAPI.delete("/delete_staffs/:id", StaffController.deleteStaff);
module.exports = routerAPI;
