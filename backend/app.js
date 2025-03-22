require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const User = require('./routes/user.routes');
const Book = require('./routes/book.routes');
const Favourite = require('./routes/favourite.routes');
const Cart = require('./routes/cart.routes');
const Order = require('./routes/order.routes');
const Auth = require('./routes/auth.routes');

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

app.use(express.json());

app.use('/api/v1', User)
app.use('/api/v1', Book)
app.use('/api/v1', Favourite)
app.use('/api/v1', Cart)
app.use('/api/v1', Order)
app.use('/api/v1', Auth);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})