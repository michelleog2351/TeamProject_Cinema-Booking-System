var mysql = require("mysql2");



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

exports.getUsers = function (req, res) {
  connection.query("SELECT * FROM User", function (err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
};

exports.getUser = function (req, res) {
  var EmployeeID = req.params.EmployeeID; 

  const query = "SELECT * FROM User WHERE EmployeeID = ?"; 
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

exports.createUser = function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  connection.query("SELECT * FROM User WHERE Email = ?", [email], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error checking email");
    }

    if (rows.length > 0) {
      return res.status(400).send({ error: "Email already in use" });
    }

    const query = "INSERT INTO User (Name, Email, Password, Role) VALUES (?, ?, ?, ?)";
    connection.query(query, [name, email, password, role], function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error adding user");
      }
      res.send({ message: "User added successfully", EmployeeID: result.insertId });
    });
  });
};


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
