const { Router } = require("express");
const router = Router();

const { createNewUser, swapStatus, getAllUsers, swapType, userLogin, getUser, getSocialUser, confirmReset,resetPw } = require('../Controllers/userController');


//localhost:3001/user

router.post("/", createNewUser);
router.put("/", swapStatus);
router.put("/:id", swapType);
router.get("/", getAllUsers);
router.get("/socialuser/:sub", getSocialUser);
router.post("/login", userLogin);

router.post("/reset", resetPw);
router.put("/reset/:id/:token", confirmReset);
router.get("/isuser/:email", getUser);


module.exports = router;