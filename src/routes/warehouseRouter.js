const express = require("express");
const routerAPI = express.Router();
const wareController = require("../controllers/wareController");
// Correct routes and methods for warehouse operations
routerAPI.post("/create_warehouse", wareController.createWare);
routerAPI.get("/list_warehouse", wareController.getWare); // Use GET for listing
// routerAPI.get("/detail_warehouse/:id", wareController.getDetailWarehouse); // chi tiết kho theo id
// routerAPI.put("/update_warehouse/:id", wareController.updateWare); // cập nhật kho

module.exports = routerAPI;
