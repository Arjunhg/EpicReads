const router = require('express').Router();
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../utils/user.auth');
const Book = require('../models/book.schema');

// Admin API
// add book -  admin
router.post('/add-book', authenticateToken, async(req, res) => {
    try {

        const { id } = req.user; //to check if user admin or not

        const user = await User.findById(id);

        if(user.role !== 'admin'){
            return res.status(403).json(
                {
                    message: "Forbidden"
                }
            )
        }
        
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        })

        await book.save();

        return res.status(201).json(
            {
                message: "Book added successfully"
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

// update book
router.put('/update-book/:bookId', authenticateToken, async(req, res) => {
    try {
        
        const {id} = req.user; //from token
        const { bookId } = req.params;

        const user = await User.findById(id);
        if(user.role !== 'admin'){
            return res.status(403).json(
                {
                    message: "Forbidden: Only admin can update book"
                }
            )
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });

        if(!updatedBook){
            return res.status(404).json(
                {
                    message: "Book not found"
                }
            )
        }

        return res.status(200).json(
            {
                message: "Book updated successfully",
                book: updatedBook
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

// delete book
router.delete('/delete-book/:bookId', authenticateToken, async(req, res) => {
    try {
        
        const { id } = req.user;
        const { bookId } = req.params;

        const user = await User.findById(id);
        if(user.role !== 'admin'){
            return res.status(403).json(
                {
                    message: "Forbidden: Only admin can delete book"
                }
            )
        }

        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json(
                {
                    message: "Book not found"
                }
            )
        }

        await Book.findByIdAndDelete(bookId);

        return res.status(200).json(
            {
                message: "Book deleted successfully"
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

// Public API

// get all books
router.get('/get-all-books', async(req, res) => {
    try {
        
        const books = await Book.find().sort({createdAt: -1});

        if(books.length === 0){
            return res.status(200).json(
                {
                    message: "No books found",
                    books: []
                }
            )
        }

        return res.status(200).json(
            {
                message: "Books retrieved successfully",
                books
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

//  get recent added books: limit 4
router.get('/get-recent-books', async(req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4);

        if(books.length === 0){
            return res.status(200).json(
                {
                    message: "No books found",
                    books: []
                }
            )
        }

        return res.status(200).json(
            {
                message: "Books retrieved successfully",
                books
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

// get book by id
router.get('/get-book/:bookId', async(req, res) => {
    try {
        const { bookId } = req.params;

        const book = await Book.findById(bookId);

        if(!book){
            return res.status(404).json(
                {
                    message: "Book not found"
                }
            )
        }

        return res.status(200).json(
            {
                message: "Book retrieved successfully",
                book
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