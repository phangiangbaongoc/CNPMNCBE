// const Cart = require("../models/cartModel");
const cartService = require("../services/cartService");

const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart(req.body);
    res
      .status(201)
      .json({ message: "Cart created successfully", cart: newCart });
  } catch (err) {
    console.error("Lỗi khi tạo giỏ hàng:", err);
    res
      .status(400)
      .json({ message: "Failed to create cart", error: err.message });
  }
};

const getCartByStaffId = async (req, res) => {
  try {
    const cart = await cartService.getCartByStaffId(req.params.staff_id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error("Lỗi khi lấy giỏ hàng:", err);
    res
      .status(400)
      .json({ message: "Failed to fetch cart", error: err.message });
  }
};

module.exports = { createCart, getCartByStaffId };
