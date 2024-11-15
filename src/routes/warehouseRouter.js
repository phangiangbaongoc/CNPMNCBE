const express = require("express");

const {
  createWare,
  getWare,
  // updateWarehouse,
  // deleteWarehouse,
} = require("../controllers/wareController");

const routerAPI = express.Router();

// Correct routes and methods for warehouse operations
routerAPI.post("/create_warehouse", createWare);
routerAPI.get("/list_warehouse", getWare); // Use GET for listing
// routerAPI.put("/update_warehouse", updateWarehouse); // Use PUT for updating
// routerAPI.delete("/delete_warehouse", deleteWarehouse); // Use DELETE for deletion

module.exports = routerAPI;
