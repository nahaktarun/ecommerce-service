const mongoose = require("mongoose")
// name, email, password, role, createdAt

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);