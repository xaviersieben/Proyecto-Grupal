const { Router } = require('express');
const Product = require('./ProductRoute.js');
const Category = require('./CategoryRoute.js');



const router = Router();

// Configurar los routers
router.use('/product', Product);
router.use('/category', Category);



module.exports = router;
