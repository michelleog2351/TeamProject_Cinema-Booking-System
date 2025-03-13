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
exports.getUser = function (req, res) {
  connection.query("SELECT * FROM User", function (err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
};

//This will search for independent user in update
exports.getUser = function (req, res) {
  var EmployeeID = req.params.EmployeeID; // Gets the Id of user

  const query = "SELECT * FROM User WHERE EmployeeID = ?"; //creates a query using prepared statemetns
  connection.query(query, [EmployeeID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting user");
    }
    if (rows.length === 0) {
      return res.status(404).send({ message: "user not found" });
    }
    res.json(rows[0]);
  });
};

//Creates a new entry of user by passing name, email and password
exports.createUser = function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  const query = "INSERT INTO User (Name, Email, Password) VALUES (?, ?, ?)"; //Prepared statments
  connection.query(query, [name, email, password, role], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding user");
    }
    res.send({
      message: "user added successfully",
      EmployeeID: result.insertId,
    });
  });
};

//Deletes an user by passing an ID
exports.deleteUser = function (req, res) {
  var EmployeeID = req.params.EmployeeID;

  const query = "DELETE FROM User WHERE EmployeeID = ?";
  connection.query(query, [EmployeeID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting user");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "user not found" });
    }
    res.send({ message: "user deleted successfully" });
  });
};

//Updates an user to have new data
exports.updateUser = function (req, res) {
  var EmployeeID = req.params.EmployeeID;
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  const query =
    "UPDATE User SET Name = ?, Email = ?, Password = ?, Role = ? WHERE EmployeeID = ?";
  connection.query(
    query,
    [name, email, password, role, EmployeeID],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating user");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "user not found" });
      }
      res.send({ message: "user updated successfully" });
    }
  );
};
