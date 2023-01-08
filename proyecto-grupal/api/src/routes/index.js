const { Router } = require("express");
const Product = require("./ProductRoute.js");
const Category = require("./CategoryRoute.js");
const Order = require("./OrderRoute");
const Review = require("./ReviewRoute");
const User = require("./UserRoute.js");
const checksuccess = require("./Cheksuccess");
const createPreference = require("./checkout");


const router = Router();

// Configurar los routers
router.use("/product", Product);
router.use("/category", Category);
router.use("/orders", Order);
router.use("/user", User);
router.use("/checkout", createPreference);
router.use("/checkout/success", checksuccess);
router.use("/review", Review);




module.exports = router;
