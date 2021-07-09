//FUNCTIONS FOR AUTHENTICATION

// NPM Package Requirements
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../conifgs/db");
const express = require("express"); // For server
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "https://test-web-devil.herokuapp.com",
      "http://127.0.0.1:5502",
    ],
    credentials: true,
  })
);

//SignUp Function
exports.signUp = (req, res) => {
  const { name, email, userName, password } = req.body; // Data from req
  var text = "SELECT * FROM users WHERE email = $1 OR userName = $2";
  var values = [email, userName];
  client
    .query(text, values) //Checking database for already registered email
    .then((data) => {
      var rows = data.rows;

      // If email is already registered
      if (rows.length !== 0) {
        res.status(403).json({
          error: "Credentials already in use.",
        });
      }

      // If credentials are not already registered then
      else {
        //hashing password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Hashing Failed in signUp",
            });
          } else {
            code = Math.floor(Math.random() * 6) + 0; //Assingning a random code for setting user profile pic

            //Generating token for email, code and userName using private key
            const token = jwt.sign(
              {
                email,
                userName,
                code,
              },
              process.env.PRIVATE_KEY
            );

            const user = {
              name,
              email,
              password: hash,
              e1: "FALSE",
              e2: "FALSE",
              e3: "FALSE",
              e4: "FALSE",
              e5: "False",
              userName,
              token,
              // To add more event update code here.
            }; // Data of new user

            text =
              "INSERT INTO users (name, email, password,e1,e2,e3,e4,e5,userName,token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";
            values = [
              user.name,
              user.email,
              user.password,
              user.e1,
              user.e2,
              user.e3,
              user.e4,
              user.e5,
              user.userName,
              user.token,
            ];
            client
              // Adding user to database
              .query(text, values) // To add more event update code here. Updates required at two places
              .then((data) => {
                // Sending token to frontend
                res
                  .status(201)
                  .cookie("token", token, {
                    expires: new Date(Date.now() + 67),
                    secure: true, // set to true if your using https
                    httpOnly: true,
                    sameSite: "none",
                  })
                  .json({
                    message: "User signed up successfully!",
                  });
              })
              .catch((err) => {
                console.error(err);
                res.status(500).json({
                  error: "Database error occurred in signUp! 1",
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in signUp! 2",
      });
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body; //Data from req

  var text = "SELECT * FROM users WHERE email = $1;";
  var values = [email];
  client
    //Getting user data from database
    .query(text, values)
    .then((data) => {
      var userData = data.rows;
      //If user does not exist
      if (userData.length === 0) {
        res.status(404).json({
          error: "User does not exist, signup instead!",
        });
      } else {
        //Checking password
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Password comparision failed in signIn",
            });
          }

          //If password matches
          else if (result == true) {
            //Getting token
            const token = userData[0].token;
            //sending token to frontend
            res.status(200).json({
              message: "User signed in successfully!",
              token: token,
            });
          }

          //If password is incorrect
          else {
            res.status(401).json({
              error: "Incorrect password!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in signIn!",
      });
    });
};
