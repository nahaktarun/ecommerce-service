const express = require('express')
const router = express.Router()
const Cart = require('../models/cart')
const Product = require('../models/product')

// Get the cart information
router.get("/", async(req, res)=> {

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
router.post("/", async(req, res)=> {
    try {
        // user verification
        const userId = req.user.userId;
        const {productId, quantity = 1} = req.body;

        // cart verification
        let cart = await Cart.findOne({user: userId});

        // product verification
        const product = await Product.findById(productId);
        if (!product){
            return res.status(404).json({message: "Product not found"})
        }
        
        const exitingItem = cart.items.find((item)=> item.product.equals(productId))
        if(exitingItem){
            exitingItem.quantity += quantity
        }else{
            cart.items.push({product: productId, quantity})
        }

        await cart.save()
        await cart.populate("items.product");
        return res.json(cart.items)
        // perform the action
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
})
// delete the cart information from the UI
router.delete("/:productId", async(req, res)=> {
    try {
        const userId = req.user.userId;
        const {productId} = req.params;
        let cart = await Cart.findOne({user: userId})
        if (!cart){
            return res.status(404).json({message: "cart not found"})
        }

        cart.items = cart.items.filter((item)=> !item.product.equals(productId))
        await cart.save()
        await cart.populate("items.product")
        return res.json(cart.items)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
})

module.exports = router