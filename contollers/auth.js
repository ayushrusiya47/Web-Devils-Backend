//FUNCTIONS FOR AUTHENTICATION

// NPM Package Requirements
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../conifgs/db");

//SignUp Function
exports.signUp = (req, res) => {
  const { name, email, password } = req.body; // Data from req

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`) //Checking database for already registered email
    .then((data) => {
      rows = data.rows;

      // If email is already registered
      if (rows.length !== 0) {
        res.status(403).json({
          error: "User already exists.",
        });
      }

      // If email is not registered then
      else {
        //hashing password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Hashing Failed in signUp",
            });
          } else {
            const user = {
              name,
              email,
              password: hash,
              e1: "FALSE",
              e2: "FALSE",
              e3: "FALSE",
              e4: "FALSE",
              e5: "False",
              // To add more event update code here.
            }; // Data of new user

            client
              // Adding user to database
              .query(
                `INSERT INTO users (name, email, password,e1,e2,e3,e4,e5) VALUES ('${user.name}', '${user.email}' , '${user.password}', '${user.e1}', '${user.e2}', '${user.e3}', '${user.e4}', '${user.e5}');`
                // To add more event update code here. Updates required at two places
              )
              .then((data) => {
                //Generating token for email using private key
                const token = jwt.sign(
                  {
                    email: email,
                  },
                  process.env.PRIVATE_KEY
                );

                //Sending token to frontend
                res.status(201).json({
                  message: "User signed up successfully!",
                  token: token,
                });
              })
              .catch((err) => {
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

  client
    //Getting user data from database
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;

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
          else if (result === true) {
            //Generating token
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.PRIVATE_KEY
            );
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
