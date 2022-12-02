const { Router } = require('express');
const router = Router();

const { getCategory, getAllCategories, createNewCategory, getCategoryById, deleteCategory, updateCategory } = require("../Controllers/categoryController");


//localhost:3001/product


router.post("/", createNewCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

router.get("/", getCategory);

module.exports = router;