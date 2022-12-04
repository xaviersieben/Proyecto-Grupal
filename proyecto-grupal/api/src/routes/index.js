const { Router } = require('express');
const Product = require('./ProductRoute.js');
const Category = require('./CategoryRoute.js');
const Order = require('./OrderRoute');



const router = Router();

// Configurar los routers
router.use('/product', Product);
router.use('/category', Category);
router.use('/orders', Order);



module.exports = router;
