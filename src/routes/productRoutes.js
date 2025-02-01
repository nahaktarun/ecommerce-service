const express = require('express')
const router = express.Router()
const Product = require('../models/product')
// get the list of products
router.get("/", async(req, res)=> {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Server error"})
    }
})

// creating a product
router.post("/", async(req, res)=> {


    try{
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Server error"})
    }
})


module.exports = router;