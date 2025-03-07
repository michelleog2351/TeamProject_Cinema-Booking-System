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

exports.getTheatres = function (req, res) {
  connection.query("SELECT * FROM theatre", function (err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
};

exports.getTheatre = function (req, res) {
  var theatreID = req.params.TheatreID;
  const query = "SELECT * FROM theatre WHERE TheatreID = ?";
  connection.query(query, [theatreID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting theatre");
    }
    if (rows.length === 0) {
      return res.status(404).send({ message: "Theatre not found" });
    }
    res.json(rows[0]);
  });
};

exports.createTheatre = function (req, res) {
  var Capacity = req.body.Capacity;
  const query = "INSERT INTO theatre (Capacity) VALUES (?)";
  connection.query(query, [Capacity], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding theatre");
    }
    res.send({ message: "Theatre added", TheatreID: result.insertId });
  });
};

exports.updateTheatre = function (req, res) {
  var TheatreID = req.params.TheatreID;
  var Capacity = req.body.Capacity;

  const query = "UPDATE theatre SET Capacity = ? WHERE TheatreID = ?";
  connection.query(query, [Capacity, TheatreID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating Theatre");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Theatre not found" });
    }
    res.send({ message: "Theatre updated successfully" });
  });
};

exports.deleteTheatre = function (req, res) {
  var TheatreID = req.params.TheatreID;

  const query = "DELETE FROM theatre WHERE TheatreID = ?";
  connection.query(query, [TheatreID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting theatre");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Theatre not found" });
    }
    res.send({ message: "Theatre deleted successfully" });
  });
};

exports.getCapacity = function (req, res) {
  connection.query("SELECT * FROM Capacity", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};


exports.getTheatreCapacity = function (req, res) {
  var TheatreID = req.body.TheatreID;
  const query = "SELECT Capacity FROM Theatre WHERE TheatreID = ?";
  connection.query(query, [TheatreID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};