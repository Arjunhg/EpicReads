require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const user = require('./routes/user.routes');

connectDB();

app.use(express.json());

app.use('/api/v1', user)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})