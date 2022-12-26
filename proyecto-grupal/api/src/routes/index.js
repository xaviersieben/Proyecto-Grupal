const { Router } = require('express');
const Product = require('./ProductRoute.js');
const Category = require('./CategoryRoute.js');

const Order = require('./OrderRoute');

const User = require('./UserRoute.js');
const createPreference = require("./checkout");



const router = Router();

// Configurar los routers
router.use('/product', Product);
router.use('/category', Category);
router.use('/orders', Order);
router.use('/user', User);
router.use('/checkout',createPreference);




module.exports = router;
