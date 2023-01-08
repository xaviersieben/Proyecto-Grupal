const { Router } = require('express');
const router = Router();
const {notificationOrder } = require('../Controllers/orderController');




//localhost:3001/product

router.post("/",notificationOrder)


module.exports = router;