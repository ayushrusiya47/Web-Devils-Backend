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
      const text = "SELECT * FROM users WHERE email = $1 AND userName = $2";
      const values = [email, userName];
      client
        //Checking if decoded data is in database
        .query(text, values)
        .then((data) => {
          //If decoded data is not in database
          if (data.rows.length === 0) {
            res.status(401).json({
              error: "Invalid token please SignIn",
            });
          } else {
            req.email = email; //Storing email in req
            req.userName = userName; //Storing userName in req
            req.code = data.rows[0].code; //Storing code in req
            next(); //Next only after token is verified and decoded data is in database
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
