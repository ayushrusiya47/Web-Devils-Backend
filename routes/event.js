//EVENT ROUTES

const express = require("express");
const router = express.Router();

const {
  register,
  unregister,
  status,
  registerAll,
  unregisterAll,
  openStatus,
} = require("../contollers/event"); //Getting functions
const { verifyToken } = require("../middlewares/authMiddleware"); //Middleware for verifying token

//Requests
router.put("/register", verifyToken, register); //For registering in a event
router.put("/unregister", verifyToken, unregister); //For unregistering from a event
router.get("/status", verifyToken, status); // Registration status of a event
router.get("/openStatus", verifyToken, openStatus); // Open/Close event status
router.put("/registerAll", verifyToken, registerAll); // For registering all events
router.put("/unregisterAll", verifyToken, unregisterAll); // For unregistering all events

module.exports = router;
