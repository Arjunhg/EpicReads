const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    // we need to know which user made the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for Delivery", "Delivered", "Cancelled"],
    }
}, {  timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = Order;