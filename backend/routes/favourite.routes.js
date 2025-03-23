// For logged in users
const router = require('express').Router();
const User = require('../models/user.schema');
const Book = require('../models/book.schema');
const authenticateToken = require('../utils/user.auth');

// add to favourite
router.put('/add-book-to-favourite/:bookId', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { bookId } = req.params;

        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" }); 
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const user = await User.findById(id);
        if (!user || !Array.isArray(user.favorites)) {
            return res.status(400).json({ message: "User data invalid" }); 
        }

        if (user.favorites.includes(bookId)) {
            return res.status(200).json({ message: "Book already in favourites" }); 
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { favorites: bookId } },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Book added to favourites",
            favorites: updatedUser.favorites
        });
    } catch (error) {
        console.error("Error in add-book-to-favourite:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// remove from favourite
router.put('/remove-book-from-favourite/:bookId', authenticateToken, async(req, res) => {
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
       
        if(!user.favorites.includes(bookId)){
            return res.status(400).json(
                {
                    message: "Book not in favourites"
                }
            )
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { favorites: bookId } },
            { new: true, runValidators: true }
        )

        return res.status(200).json(
            {
                message: "Book removed from favourites",
                favorites: updatedUser.favorites
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

// get all favourites of particular user
router.get('/get-all-favourites', authenticateToken, async(req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id).populate('favorites') //This ensures that full book details (not just bookIds) are retrieved.
        if(!user){
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }

        if(user.favorites.length === 0){
            return res.status(200).json(
                {
                    message: "No favourites found",
                    favorites: []
                }
            )
        }

        return res.status(200).json({
            message: "Favourites fetched successfully",
            favorites: user.favorites
        });
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})



module.exports = router;