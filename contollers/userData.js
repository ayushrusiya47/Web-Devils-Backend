// FUNCTIONS FOR GETTING AND UPDATING USERDATA

const client = require("../conifgs/db");
const jwt = require("jsonwebtoken");

exports.getData = (req, res) => {
  res.status(200).json({
    code: req.code,
    email: req.email,
    name: req.userName,
  });
};

exports.changeCode = (req, res) => {
  email = req.email;
  userName = req.userName;
  code = req.body.code;

  var text = "UPDATE users SET code = $1 WHERE email = $2";
  var values = [code, email];
  client
    .query(text, values)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Database error occured in userdata changeCode",
      });
    });
};
