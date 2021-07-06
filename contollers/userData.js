// FUNCTIONS FOR GETTING AND UPDATING USERDATA

const client = require("../conifgs/db");
const jwt = require("jsonwebtoken");

exports.getCode = (req, res) => {
  var code = req.code;
  res.status(200).json({
    code: code,
  });
};

exports.changeCode = (req, res) => {
  email = req.email;
  userName = req.userName;
  code = req.body.code;
  const token = jwt.sign(
    {
      email,
      userName,
      code,
    },
    process.env.PRIVATE_KEY
  );
  client
    .query(
      `UPDATE users
  SET token = '${token}'
  WHERE email = '${req.email}'`
    )
    .then(() => {
      res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Database error occured in userdata changeCode",
      });
    });
};
