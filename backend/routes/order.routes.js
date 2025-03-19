const router = require('express').Router();
const Order = require('../models/order.schema');
const Book = require('../models/book.schema');
const authenticateToken = require('../utils/user.auth');
const User = require('../models/user.schema');
const { default: mongoose } = require('mongoose');

// place order
router.post('/place-order', authenticateToken, async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { id } = req.user;
        const { order } = req.body;

        if(!order || order.length === 0){
            return res.status(400).json(
                {
                    message: "Order can not be empty"
                }
            )
        }

        // check if all books exist
        const bookIds = order.map(orderData => orderData.bookId);
        const books = await Book.find({ _id: { $in: bookIds } });

        if(books.length !== bookIds.length){
            return res.status(404).json(
                {
                    message: "Some books not found"
                }
            )
        }

        // create order entries in bulk
        const orderDocs = order.map(orderData => ({
            user: id,
            book: orderData.bookId,
        }))
        const savedOrders = await Order.insertMany(orderDocs, { session });

        // extract order id
        const orderIds = savedOrders.map(order => order._id);

        // update user's order in one go
        await User.findByIdAndUpdate(id, {
            $push: { orders: { $each: orderIds } },
            $pull: { cart: { $in: bookIds } },
        }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(
            {
                message: "Order placed successfully",
                data: orderIds,
            }
        )
    }catch(error){
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

// get order history of particular user
app.get('/get-order-history', authenticateToken, async (req, res) => {
    try {
        
        const  { id } = req.user;

        const userData = await User.findById(id).populate({
            path: 'order',
            populate: { path: 'book' }
        })

        if(!userData){
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }

        if(userData.orders.length === 0){
            return res.status(200).json(
                {
                    message: "No order history found",
                    data: []
                }
            )
        }

        const ordersData = [...userData.orders].reverse(); //Prevents modifying original array
        return res.status(200).json(
            {
                message: "Order history fetched successfully",
                data: ordersData
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

// get all orders - admin
router.get('/get-all-orders', authenticateToken, async(req, res) => {
    try {
        
        const { role } = req.user;
        if(role !== 'admin'){
            return res.status(403).json(
                {
                    message: "Forbidden"
                }
            )
        }

        const orders = await Order.find()
            .populate({
                path: 'user',
            })
            .populate({
                path: 'book',
            })
            .sort({ createdAt: -1 });

        if(orders.length === 0){
            return res.status(200).json(
                {
                    message: "No orders found",
                    data: []
                }
            )
        }

        return res.status(200).json(
            {
                message: "Orders fetched successfully",
                data: orders
            }
        )
    } catch (error) {
        console.error("Error in get-all-orders: ", error);
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

// update orders: admin
router.put('/update-order/:orderId', authenticateToken, async(req, res) => {
    try {
        
        const { role } = req.user;
        if(role !== 'admin'){
            return res.status(403).json(
                {
                    message: "Forbidden"
                }
            )
        }

        const { orderId } = req.params;
        const { status } = req.body;

        if(!status){
            return res.status(400).json(
                {
                    message: "Status can not be empty"
                }
            )
        }

        const runValidStatus = ["Order Placed", "Out for Delivery", "Delivered", "Cancelled"];
        if(!runValidStatus.includes(status)){
            return res.status(400).json(
                {
                    message: "Invalid status"
                }
            )
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {status}, { new: true, runValidators: true }).select('-__v');

        if(!updatedOrder){
            return res.status(404).json(
                {
                    message: "Order not found"
                }
            )
        }

        return res.status(200).json(
            {
                message: "Order updated successfully",
                data: updatedOrder
            }
        )
    } catch (error) {
        console.error("Error in update-order: ", error);
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

module.exports = router;