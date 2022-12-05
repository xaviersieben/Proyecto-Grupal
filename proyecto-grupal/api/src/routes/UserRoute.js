const { Router } = require("express");
const router = Router();
const { createNewUser } = require('../Controllers/userController');

//localhost:3001/user

router.post("/", createNewUser);

module.exports = router;