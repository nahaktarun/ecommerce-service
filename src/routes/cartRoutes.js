const express = require('express')
const router = express.Router()
const Cart = require('../models/cart')
const Product = require('../models/product')
const authMiddleware = require('../middlewares/authMiddleware')
// Get the cart information
router.get("/", authMiddleware, async(req, res)=> {

    try {
        const userId = req.user.userId; //JWT
        let cart = await Cart.findOne({user: userId}).populate("items.product");
        if (!cart){
            return res.json([]);
        }
        res.json(cart.items)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
})


// POST CREATE the cart information
router.post("/", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; // from JWT
      const { productId, quantity = 1 } = req.body;
  
      // Check for existing cart; create if not found
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      // Validate product
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // If product is already in cart, increment quantity
      const existingItem = cart.items.find((item) =>
        item.product.equals(productId)
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
  
      await cart.save();
      await cart.populate("items.product");
      return res.json(cart.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
// delete the cart information from the UI
router.delete("/:productId", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; // from JWT
      const { productId } = req.params;
  
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      cart.items = cart.items.filter((item) => !item.product.equals(productId));
      await cart.save();
      await cart.populate("items.product");
      return res.json(cart.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router