//FUNCTIONS FOR EVENTS

const client = require("../conifgs/db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.sendMail = (req, res) => {
  const email = req.body.email;
  const userName = req.body.userName;
  const token = jwt.sign(
    {
      email,
      userName,
    },
    process.env.PRIVATE_KEY
  );
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ayushhpp9@gmail.com",
      pass: "my pswrd",
    },
  });
  let mailDetails = {
    from: "ayushhpp9@gmail.com",
    to: `${email}`,
    subject: "Verify your mail id",
    text: `http://localhost:8002/verification/verify/${token}`,
  };
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

exports.verify = (req, res) => {};
