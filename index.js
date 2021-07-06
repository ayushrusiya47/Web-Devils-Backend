// NPM Package Requirements
require("dotenv").config(); // For setting env variables
const express = require("express"); // For server
const cors = require("cors");
const client = require("./conifgs/db"); // Database client
const app = express();
app.use(express.json());
app.use(cors());

// Aquiring routes
const authRoutes = require("./routes/auth"); // For signin and signup
const event = require("./routes/event"); // For registering, unregistering and checking status of events
const admin = require("./routes/admin"); // For authentication of admin, checking registration and open and close events
const userData = require("./routes/userData"); // For getting and updating user data

const port = process.env.PORT || 8000; // Defining port for server

//Starting server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//connecting to database
client.connect(() => {
  console.log("connected database sucesfully");
});

app.get("/", (req, res) => {
  res.send("hello");
});

// Starting Routes
app.use("/auth", authRoutes);
app.use("/event", event);
app.use("/admin", admin);
app.use("/userData", userData);
