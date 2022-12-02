const { Router } = require('express');
const router = Router();
const { getCategory } = require("../Controllers/categoryController");

//localhost:3001/category

router.get("/", getCategory);

module.exports = router;