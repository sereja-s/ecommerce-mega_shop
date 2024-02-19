const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


// Import Routes
const productsRouter = require('./routes/products');
const orderRouter = require('./routes/order');
//const usersRouter = require('./routes/users');


const app = express();

app.use(cors({
	origin: '*',
	methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
	allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', orderRouter);
//app.use('/api/users', usersRouter);

module.exports = app;