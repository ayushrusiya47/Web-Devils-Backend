// AUTHENTICATION ROUTES

const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../contollers/auth"); //Getting functions

//Requests
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
