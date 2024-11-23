const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

class CartService {
  async createCart(data) {
    const { staff_id, items } = data;

    const processedItems = items.map((item) => ({
      productId: mongoose.Types.ObjectId(item.productId),
      quantity: item.quantity,
      price: item.price,
    }));

    const cart = new Cart({
      staff_id: mongoose.Types.ObjectId(staff_id),
      items: processedItems,
      totalItems: processedItems.length,
      totalPrice: processedItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ),
    });

    return await cart.save();
  }

  async getCartByStaffId(staff_id) {
    return await Cart.findOne({
      staff_id: mongoose.Types.ObjectId(staff_id),
    }).populate("items.productId");
  }

  // Thêm các hàm khác nếu cần, ví dụ: cập nhật hoặc xóa giỏ hàng
}

module.exports = new CartService();
