// ROUTES FOR USERDATA

const express = require("express");
const router = express.Router();

const { getData, changeCode } = require("../contollers/userData"); //Getting functions
const { verifyToken } = require("../middlewares/authMiddleware"); //Middleware for verifying token

//Requests
router.get("/getData", verifyToken, getData);
router.put("/changeCode", verifyToken, changeCode);

module.exports = router;
