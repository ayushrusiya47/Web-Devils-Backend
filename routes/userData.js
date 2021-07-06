// ROUTES FOR USERDATA

const express = require("express");
const router = express.Router();

const { getCode, changeCode } = require("../contollers/userData"); //Getting functions
const { verifyToken } = require("../middlewares/authMiddleware"); //Middleware for verifying token

//Requests
router.get("/getCode", verifyToken, getCode);
router.put("/changeCode", verifyToken, changeCode);

module.exports = router;
