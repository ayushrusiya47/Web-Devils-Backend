//ADMIN ROUTES

const express = require("express");
const router = express.Router();

//Getting functions and middlewares
const {
  getList,
  count,
  eventClose,
  eventOpen,
} = require("../contollers/admin");
const { signIn } = require("../contollers/auth"); //From signIn in auth.js
const { verifyToken } = require("../middlewares/authMiddleware");

//Requests
router.post("/auth", signIn); //For sign in with password, hence token verification not required
router.get("/getList", verifyToken, getList); //For large data CHECK GET REQUEST SUPPORT
router.get("/count", verifyToken, count); //For getting no. of registered users for fest and all individual events
router.put("/eventClose", verifyToken, eventClose); //For closing events
router.put("/eventOpen", verifyToken, eventOpen); //For restarting closed events

module.exports = router;
