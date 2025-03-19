const router = require('express').Router();
const User = require('../models/user.schema');
const Book = require('../models/book.schema');
const authenticateToken = require('../utils/user.auth');

// put book to cart
router.put('/add-book-to-cart/:bookId', authenticateToken, async(req, res) => {
    try {
        const { id } = req.user;
        const { bookId } = req.params;

        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json(
                {
                    message: "Book not found"
                }
            )
        }

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }

        const isBookInCart =  user.cart.includes(bookId);
        if(isBookInCart){
            return res.status(400).json(
                {
                    message: "Book already in cart"
                }
            )
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { cart: bookId } },
            { new: true, runValidators: true }
        ).populate('cart');

        return res.status(200).json(
            {
                message: "Book added to cart",
                cart: updatedUser.cart
            }
        )
    } catch (error) {
        console.log("Internal Server Error", error);    
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

// remove book from cart
router.put('/remove-book-from-cart/:bookId', authenticateToken, async(req, res) => {
    try {
        const { id } = req.user;
        const { bookId } = req.params;

        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json(
                {
                    message: "Book not found"
                }
            )
        }

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }

        const isBookInCart =  user.cart.includes(bookId);
        if(!isBookInCart){
            return res.status(400).json(
                {
                    message: "Book not in cart"
                }
            )
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { cart: bookId } },
            { new: true, runValidators: true }
        ).populate('cart');

        return res.status(200).json(
            {
                message: "Book removed from cart",
                cart: updatedUser.cart
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

// get cart of particular user
router.get('/get-cart', authenticateToken, async(req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).populate('cart');
        const cart = user.cart.reverse();

        if(!user){
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }
        return res.status(200).json(
            {
                message: "Cart fetched successfully",
                data: cart
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

module.exports = router;