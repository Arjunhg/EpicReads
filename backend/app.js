require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const user = require('./routes/user.routes');
const Book = require('./routes/book.routes');
const Favourite = require('./routes/favourite.routes');
const Cart = require('./routes/cart.routes');

connectDB();

app.use(express.json());

app.use('/api/v1', user)
app.use('/api/v1', Book)
app.use('/api/v1', Favourite)
app.use('/api/v1', Cart)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})