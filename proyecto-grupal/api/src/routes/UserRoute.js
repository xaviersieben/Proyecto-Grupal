const { Router } = require("express");
const router = Router();
const { createNewUser, swapStatus, getAllUsers, swapType, userLogin, getUser, getSocialUser } = require('../Controllers/userController');

//localhost:3001/user

router.post("/", createNewUser);
router.put("/", swapStatus);
router.put("/:id", swapType);
router.get("/", getAllUsers);
router.get("/socialuser/:sub", getSocialUser);
router.post("/login", userLogin);
router.get("/isuser/:email", getUser);

module.exports = router;