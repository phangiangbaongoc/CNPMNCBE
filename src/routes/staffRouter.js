const express = require("express");
const { createStaff, getStaff } = require("../controllers/staffController");
const upload = require("../middlewares/upload");

const routerAPI = express.Router();
routerAPI.post("/create_staff", upload.single("image"), createStaff);
routerAPI.get("/list_staff", getStaff);
module.exports = routerAPI;
