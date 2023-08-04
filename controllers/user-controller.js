const express = require("express");
const router = express.Router();
const userServices = require("../services/user-services");

//user routes
router.post("/register", userServices.userRegister);
router.post("/login", userServices.userLogin);
module.exports = router;
