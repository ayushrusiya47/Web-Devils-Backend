//MIDDLEWARE FOR VERIFYING TOKEN

const client = require("../conifgs/db");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Get token from headers

  //Verifying token and extracting email using private key
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      res.status(500).json({
        error: "JWT verification error in verifyToken middleware",
      });
      console.log(err);
    } else {
      const email = decoded.email;
      client
        //Checking if decoded email is in database
        .query(`SELECT * FROM users WHERE email = '${email}';`)
        .then((data) => {
          //If email is not in database
          if (data.rows.length === 0) {
            res.status(401).json({
              error: "Invalid token please SignIn",
            });
          } else {
            req.email = email; //Storing email in req
            next(); //Next only after token is verified and email is in database
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: "Database error occured in verifyToken middleware",
          });
        });
    }
  });
};
