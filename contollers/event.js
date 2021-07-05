//FUNCTIONS FOR EVENTS

const client = require("../conifgs/db");

exports.register = (req, res) => {
  const { event } = req.body;
  var email = req.email;
  client
    //Updating value
    .query(
      `UPDATE users
    SET ${event} = TRUE
    WHERE email = '${email}'`
    )
    .then(() => {
      res.sendStatus(204); //Update successful
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in event register!",
      });
    });
};

exports.unregister = (req, res) => {
  const { event } = req.body;
  var email = req.email;
  client
    //Updating value
    .query(
      `UPDATE users
    SET ${event} = FALSE
    WHERE email = '${email}'`
    )
    .then(() => {
      res.sendStatus(204); //Update successful
    })
    .catch((err) => {
      res.status(500).send({
        error: "Database error occurred in unregister event!",
      });
    });
};

exports.status = (req, res) => {
  var email = req.email;
  client
    //Fetching data
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows[0];
      const sta = {
        e1: userData.e1,
        e2: userData.e2,
        e3: userData.e3,
        e4: userData.e4,
        e5: userData.e5,
      }; //Status of events
      // To add more event update code here.
      res.status(200).json(sta);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in event status!",
      });
    });
};

exports.registerAll = (req, res) => {
  var email = req.email;
  client
    //Updating values
    .query(
      `UPDATE users
      SET e1 = TRUE,
      e2 = TRUE,
      e3 = TRUE,
      e4 = TRUE,
      e5 = TRUE
      WHERE email = '${email}'`
    ) // To add more event update code here.
    .then(() => {
      res.sendStatus(204); //Update successful
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in registerAll events!",
      });
    });
};

exports.unregisterAll = (req, res) => {
  var email = req.email;
  client
    //Updating values
    .query(
      `UPDATE users
      SET e1 = FALSE,
      e2 = FALSE,
      e3 = FALSE,
      e4 = FALSE,
      e5 = False
      WHERE email = '${email}'`
    )
    .then(() => {
      res.sendStatus(204); //Update successful
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in unregisterAll events!",
      });
    });
};

exports.openStatus = (req, res) => {
  client
    //Fetching data
    .query(`SELECT * FROM event`)
    .then((data) => {
      userData = data.rows[0];
      res.status(200).json(userData);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred in unregisterAll events!",
      });
    });
};
