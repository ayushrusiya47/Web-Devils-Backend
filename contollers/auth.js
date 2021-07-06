//FUNCTIONS FOR AUTHENTICATION

// NPM Package Requirements
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../conifgs/db");

//SignUp Function
exports.signUp = (req, res) => {
  const { name, email, userName, password } = req.body; // Data from req

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`) //Checking database for already registered email
    .then((data) => {
      var rows = data.rows;

      client
        .query(`SELECT * FROM users WHERE userName = '${userName}';`) //Checking database for already registered email
        .then((data) => {
          var rows1 = data.rows;
        })
        .catch((err) => {
          res.status(500).json({
            error: "Database error occurred in signUp! 1",
          });
        });

      // If email is already registered
      if (rows.length !== 0) {
        res.status(403).json({
          error: "Email already in use.",
        });
      }

      // If userName is already registered
      if (rows.length !== 0) {
        res.status(403).json({
          error: "userName already in use.",
        });
      }

      // If email and username are not registered then
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

            client
              // Adding user to database
              .query(
                `INSERT INTO users (name, email, password,e1,e2,e3,e4,e5,userName,token) VALUES ('${user.name}', '${user.email}' , '${user.password}', '${user.e1}', '${user.e2}', '${user.e3}', '${user.e4}', '${user.e5}', '${user.userName}', '${user.token}');`
                // To add more event update code here. Updates required at two places
              )
              .then((data) => {
                //Sending token to frontend
                res.status(201).json({
                  message: "User signed up successfully!",
                  token: token,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: "Database error occurred in signUp! 2",
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in signUp! 3",
      });
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body; //Data from req

  client
    //Getting user data from database
    .query(`SELECT * FROM users WHERE email = '${email}';`)
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
