const { Router } = require("express");
const router = Router();
const { getAllProducts,createNewProduct, getProductById } = require("../Controllers/productController");


//localhost:3001/product

router.get("/", getAllProducts);
router.post("/", createNewProduct);
router.get("/:id", getProductById);

module.exports = router;
