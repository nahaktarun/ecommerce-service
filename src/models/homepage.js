const mongoose = require("mongoose");

// Field: title, subtitle, imageUrl

const carouselItemSchema = new mongoose.Schema({
    title: {type: String},
    subtitle: {type: String},
    imageUrl: {type: String},
});

const homepageSchema = new mongoose.Schema({
    carousel: [carouselItemSchema],
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Homepage', homepageSchema);

