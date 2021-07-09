//Verification routes

const express = require("express");
const { sendMail, verify } = require("../contollers/verification");
const router = express.Router();

router.post("/sendMail", sendMail);
router.get("/verify/:token", verify);

module.exports = router;
