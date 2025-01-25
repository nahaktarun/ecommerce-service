const mongoose = require("mongoose");

// cartItemSchema
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    }
})

// cartSchema
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [cartItemSchema],
    },
    {timestamps: true}
)

module.exports = mongoose.model('Cart', cartSchema)