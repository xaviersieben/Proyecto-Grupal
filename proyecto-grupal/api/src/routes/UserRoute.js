const { Router } = require("express");
const router = Router();
const { createNewUser, swapStatus, getAllUsers, swapType, userLogin, resetPw, confirmReset } = require('../Controllers/userController');


//localhost:3001/user

router.post("/", createNewUser);
router.put("/", swapStatus);
router.put("/:id", swapType);
router.get("/", getAllUsers);
router.post("/login", userLogin);
router.post("/reset", resetPw);
router.put("/reset/:id/:token", confirmReset);



module.exports = router;