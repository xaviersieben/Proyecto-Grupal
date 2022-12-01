const { Router } = require("express");
const router = Router();
const { getAllProducts,createNewProduct, getProductById,deleteProduct,updateProduct } = require("../Controllers/productController");


//localhost:3001/product

router.get("/", getAllProducts);
router.post("/", createNewProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
