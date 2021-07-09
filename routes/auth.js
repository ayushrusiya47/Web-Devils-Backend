// AUTHENTICATION ROUTES

const express = require("express");
const router = express.Router();

const { signUp, signIn, changePassword } = require("../contollers/auth"); //Getting functions
const { verifyToken } = require("../middlewares/authMiddleware");

//Requests
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/changePassword", verifyToken, changePassword);

module.exports = router;
