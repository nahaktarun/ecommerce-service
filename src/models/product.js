// Fields of the product
// title, price, description, image, category, createdAt

const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    image: {type: String},
    category: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Product', productSchema)