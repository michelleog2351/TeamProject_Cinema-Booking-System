var mysql = require("mysql2");

//mysql2 is MANDATORY
//user is the user into mysql College is root
//password is your password to mysql College is password by default

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  //password: "root",
  password: "password",
  database: "cinemaDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Sucessfully connected to MySQL database cinemaDB`);
});

//This populates the table on default page for testing cruds
exports.getScreenings = function (req, res) {
  connection.query("SELECT * FROM Screening", function (err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
};

//This will search for independent Screening in update
exports.getScreening = function (req, res) {
  var screeningID = req.params.screeningID;

  const query = "SELECT * FROM Screening WHERE ScreeningID = ?"; //creates a query using prepared statemetns
  connection.query(query, [screeningID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting screening");
    }
    if (rows.length === 0) {
      return res.status(404).send({ message: "Screening not found" });
    }
    res.json(rows[0]);
  });
};

//Creates a new entry of Screening by passing name, email and password
exports.createScreening = function (req, res) {
  var startTime = req.body.startTime;
  var date = req.body.date;
  var seatsRemaining = req.body.seatsRemaining;
  var theatreID = req.body.theatreID;
  var filmID = req.body.filmID;

  const query =
    "INSERT INTO Screening (StartTime, Date, SeatsRemaining, TheatreID, FilmID ) VALUES (?, ?, ?, ?, ?)"; //Prepared statments
  connection.query(
    query,
    [startTime, date, seatsRemaining, theatreID, filmID],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error adding Screening");
      }
      res.send({
        message: "Screening added successfully",
        screeningID: result.insertId,
      });
    }
  );
};

//Deletes an Screening by passing an ID
exports.deleteScreening = function (req, res) {
  var screeningID = req.params.screeningID;

  const query = "DELETE FROM screening WHERE ScreeningID = ?";
  connection.query(query, [screeningID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting Screening");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Screening not found" });
    }
    res.send({ message: "Screening deleted successfully" });
  });
};

//Updates an Screening to have new data
exports.updateScreening = function (req, res) {
  var screeningID = req.params.screeningID;
  var startTime = req.body.startTime;
  var date = req.body.date;
  var seatsRemaining = req.body.seatsRemaining;
  var theatreID = req.body.theatreID;
  var filmID = req.body.filmID;

  const query =
    "UPDATE Screening SET StartTime = ?, Date = ?, SeatsRemaining = ?, TheatreID = ?, FilmID = ? WHERE ScreeningID = ?";

  connection.query(
    query,
    [startTime, date, seatsRemaining, theatreID, filmID, screeningID],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating Screening");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Screening not found" });
      }
      res.send({ message: "Screening updated successfully" });
    }
  );
};
