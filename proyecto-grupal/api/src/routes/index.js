const { Router } = require('express');
const Product = require('./ProductRoute.js');
const Category = require('./CategoryRoute.js');
const User = require('./UserRoute.js');



const router = Router();

// Configurar los routers
router.use('/product', Product);
router.use('/category', Category);
router.use('/user', User);



module.exports = router;
