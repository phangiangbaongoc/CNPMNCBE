const express = require("express");
const {
  createCart,
  getCartByStaffId,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/create", createCart);
router.get("/:staff_id", getCartByStaffId);

module.exports = router;
