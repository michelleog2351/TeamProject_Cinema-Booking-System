var mysql = require("mysql2");

//mysql2 is MANDATORY
//user is the user into mysql College is root
//password is your password to mysql College is password by default

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cinemaDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Sucessfully connected to MySQL database cinemaDB`);
});

//This populates the table on default page for testing cruds
exports.getManagers = function (req, res) {
  connection.query("SELECT * FROM manager", function (err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
};

//This will search for independent manager in update
exports.getManager = function (req, res) {
  var managerID = req.params.managerID; // Gets the Id of manager

  const query = "SELECT * FROM manager WHERE ManagerID = ?"; //creates a query using prepared statemetns
  connection.query(query, [managerID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting manager");
    }
    if (rows.length === 0) {
      return res.status(404).send({ message: "manager not found" });
    }
    res.json(rows[0]);
  });
};

//Creates a new entry of manager by passing name, email and password
exports.createManager = function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  const query = "INSERT INTO manager (Name, Email, Password) VALUES (?, ?, ?)"; //Prepared statments
  connection.query(query, [name, email, password], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding manager");
    }
    res.send({
      message: "manager added successfully",
      managerID: result.insertId,
    });
  });
};

//Deletes an manager by passing an ID
exports.deleteManager = function (req, res) {
  var managerID = req.params.managerID;

  const query = "DELETE FROM manager WHERE ManagerID = ?";
  connection.query(query, [managerID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting manager");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Manager not found" });
    }
    res.send({ message: "Manager deleted successfully" });
  });
};

//Updates an Manager to have new data
exports.updateManager = function (req, res) {
  var managerID = req.params.managerID;
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  const query =
    "UPDATE manager SET Name = ?, Email = ?, Password = ? WHERE managerID = ?";
  connection.query(
    query,
    [name, email, password, managerID],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating manager");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "manager not found" });
      }
      res.send({ message: "manager updated successfully" });
    }
  );
};
