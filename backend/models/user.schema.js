const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
        },
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
        }
    ]
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;