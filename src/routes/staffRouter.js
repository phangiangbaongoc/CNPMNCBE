const express = require("express");
const { createStaff, getStaff } = require("../controllers/staffController");

const routerAPI = express.Router();
routerAPI.post("/create_staffs", createStaff);
routerAPI.get("/list_staffs", getStaff);
module.exports = routerAPI;
