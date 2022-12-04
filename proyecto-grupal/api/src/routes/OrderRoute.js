const { saveUserCart, getUserCart } = require("../Controllers/cartController");
const {
  createNewOrder,
  getAllOrders,

} = require("../Controllers/orderController");

const router = require("express").Router();

router.get("/", getAllOrders);

router.post("/", createNewOrder);

router.post("/cart", saveUserCart);

router.get("/cart", getUserCart);


module.exports = router;
