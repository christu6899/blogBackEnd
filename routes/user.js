const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-controller");

//user routes
router.post("/register", userCtrl.userRegister);
router.post("/login", userCtrl.userLogin);
module.exports = router;
