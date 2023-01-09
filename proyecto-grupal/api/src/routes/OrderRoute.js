const { saveUserCart, getUserCart } = require("../Controllers/cartController");
const {
  createNewOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrderById,
  updateStatus,
  confirmOrder,
  getOrdersByUser,
} = require("../Controllers/orderController");

const router = require("express").Router();

router.get("/", getAllOrders);

router.get("/:id", getOrderById);

router.post("/", createNewOrder);

router.post("/cart", saveUserCart);

router.get("/cart", getUserCart);

router.put("/:id", updateOrder);

router.put("/status/:id", updateStatus);

router.delete("/:id", deleteOrder);

router.post("/:id", confirmOrder)

router.get("/user", getOrdersByUser);


module.exports = router;
