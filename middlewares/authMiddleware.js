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
      const userName = decoded.userName;
      const code = decoded.code;
      const text =
        "SELECT * FROM users WHERE email = $1 AND token = $2 AND userName = $3";
      const values = [email, token, userName];
      client
        //Checking if decoded data and token is in database
        .query(text, values)
        .then((data) => {
          //If email is not in database
          if (data.rows.length === 0) {
            res.status(401).json({
              error: "Invalid token please SignIn",
            });
          } else {
            req.email = email; //Storing email in req
            req.code = code; //Storing code in req
            req.userName = userName; //Storing userName in req
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
