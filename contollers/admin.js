//FUNCTION FOR ADMINS

const client = require("../conifgs/db");
const jwt = require("jsonwebtoken");

// For getting list of users for fest or particular event at a page for given items per page
exports.getList = (req, res) => {
  client
    //Fetching users from database ordered by email
    .query(
      `SELECT name, email, e1, e2, e3, e4 ,e5
          FROM users 
          ORDER BY name
          `
    )
    .then((data) => {
      res.status(200).json(data.rows); // Returning array of users for given page
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: "Database error in admin getList for all users",
      });
    });
  

};

// Returns the current no. of user registered for the fest and individual events also
exports.count = (req, res) => {
  var email = req.email;
  //If the user is admin
  if (email == "Admin@techx.com") {
    var arr = { total: 0, e1: 0, e2: 0, e3: 0, e4: 0 }; // For storing no. of registrations
    client
      // For all users registered in fest
      .query(
        `SELECT 
      COUNT(*)
      FROM users
      WHERE TRUE 
        `
      )
      .then((data) => {
        arr.total = parseInt(data.rows[0].count); //The query gives string hence converting to int
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error in admin count! 1",
        });
      });

    client
      //For users registered in e1
      .query(
        `SELECT 
      COUNT(*)
      FROM users
      WHERE e1 = TRUE 
        `
      )
      .then((data) => {
        arr.e1 = parseInt(data.rows[0].count); //The query gives string hence converting to int
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error in admin count! 2",
        });
      });

    client
      //For users registered in e2
      .query(
        `SELECT 
      COUNT(*)
      FROM users
      WHERE e2 = TRUE 
        `
      )
      .then((data) => {
        arr.e2 = parseInt(data.rows[0].count); //The query gives string hence converting to int
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error in admin count! 3",
        });
      });

    client
      //For users registered in e3
      .query(
        `SELECT 
      COUNT(*)
      FROM users
      WHERE e3 = TRUE 
        `
      )
      .then((data) => {
        arr.e3 = parseInt(data.rows[0].count); //The query gives string hence converting to int
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error in admin count! 4",
        });
      });

    client
      //For users registered in e4
      .query(
        `SELECT 
      COUNT(*)
      FROM users
      WHERE e4 = TRUE 
        `
      )
      .then((data) => {
        arr.e4 = parseInt(data.rows[0].count); //The query gives string hence converting to int
        res.status(200).json(arr); //Sending data here because this is last query and it will run after rest of query are completed
        //to be checked synchronous asynchronous pata nhi kya (-_-)
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error in admin count! 5",
        });
      });
  }

  //If the user is not admin
  else {
    res.status(401).send("AUTHENTICATION FAILED! LOG IN AGAIN.");
  }
};

// For cancelling an event
exports.eventClose = (req, res) => {
  const { event } = req.body;
  // console.log(event)
    client
      .query(
        `UPDATE event
        SET ${event} = FALSE`
      )
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error in cancel event",
        });
      });
  
};

//To restart a cancelled event
exports.eventOpen = (req, res) => {
  const { event } = req.body;
    client
      .query(
        `UPDATE event
      SET ${event} = TRUE`
      ) 
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error in open event",
        });
      });


};
