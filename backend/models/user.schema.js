const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("Error in hashing password: ", error);
        next(error);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;