var mysql = require("mysql2");

//mysql2 is MANDATORY
//user is the user into mysql College is root
//password is your password to mysql College is password by default

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "root",
  //password: "root",
  password: "password",
  database: "cinemaDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Sucessfully connected to MySQL database cinemaDB`);
});

//This populates the table on default page for testing cruds
exports.getAdmins = function (req, res) {
  connection.query("SELECT * FROM admin", function (err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
};

//This will search for independent admin in update
exports.getAdmin = function (req, res) {
  var adminID = req.params.adminID; // Gets the Id of admin

  const query = "SELECT * FROM admin WHERE AdminID = ?"; //creates a query using prepared statemetns
  connection.query(query, [adminID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting admin");
    }
    if (rows.length === 0) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.json(rows[0]);
  });
};

//Creates a new entry of Admin by passing name, email and password
exports.createAdmin = function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  const query = "INSERT INTO admin (Name, Email, Password) VALUES (?, ?, ?)"; //Prepared statments
  connection.query(query, [name, email, password], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding admin");
    }
    res.send({ message: "Admin added successfully", adminID: result.insertId });
  });
};

//Deletes an admin by passing an ID
exports.deleteAdmin = function (req, res) {
  var adminID = req.params.adminID;

  const query = "DELETE FROM admin WHERE AdminID = ?";
  connection.query(query, [adminID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting admin");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.send({ message: "Admin deleted successfully" });
  });
};

//Updates an admin to have new data
exports.updateAdmin = function (req, res) {
  var adminID = req.params.adminID;
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  const query =
    "UPDATE admin SET Name = ?, Email = ?, Password = ? WHERE AdminID = ?";
  connection.query(
    query,
    [name, email, password, adminID],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating admin");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Admin not found" });
      }
      res.send({ message: "Admin updated successfully" });
    }
  );
};
