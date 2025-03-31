var mysql = require("mysql2");
const { CronJob } = require("cron");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cinemaDB",
});

connection.connect(function (err) {
  job.start();
  if (err) throw err;
  console.log(`Successfully connected to MySQL database cinemaDB`);
});

exports.getBookings = function (req, res) {
  connection.query("SELECT * FROM Booking", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting booking");
    }
    res.json(rows);
  });
};

exports.getBooking = function (req, res) {
  var bookingID = req.params.bookingID;
  const query = "SELECT * FROM Booking WHERE BookingID = ?";
  connection.query(query, [bookingID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting booking");
    }
    if (rows.length === 0) {
      return res.status(404).send({ message: "Booking not found" });
    }
    res.json(rows[0]);
  });
};

exports.createBooking = function (req, res) {
  var noOfSeats = req.body.noOfSeats;
  var cost = req.body.cost;
  var email = req.body.email;
  var screeningID = req.body.screeningID

  const query = "INSERT INTO Booking (NoOfSeats, Cost, Email, screeningID) VALUES (?, ?, ?, ?)";
  connection.query(query, [noOfSeats, cost, email, screeningID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding new booking");
    }
    res.send({ message: "New booking created", BookingID: result.insertId });
  });
};

exports.updateBooking = function (req, res) {
  var bookingID = req.params.bookingID;
  var noOfSeats = req.body.noOfSeats;
  var cost = req.body.cost;
  var email = req.body.email;
  const query =
    "UPDATE Booking SET NoOfSeats = ?, Cost = ?, Email = ? WHERE bookingID = ?";
  connection.query(
    query,
    [noOfSeats, cost, email, bookingID],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating booking");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Booking not found" });
      }
      res.send({ message: "Booking updated successfully" });
    }
  );
};

exports.deleteBooking = function (req, res) {
  var bookingID = req.params.bookingID;

  const query = "DELETE FROM Booking WHERE BookingID = ?";
  connection.query(query, [bookingID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting booking");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Booking not found" });
    }
    res.send({ message: "Booking deleted successfully" });
  });
};

exports.deleteAllBookings = function (req, res) {

  const query = "DELETE From Booking";
  connection.query(query, function (err, result) {
    if (err) {
      console.error(err);
    }
    res.send({ message: "Booking deleted successfully" });
  });
};

exports.bookedSeats = function (req, res) {
  var screeningID = req.params.ScreeningID;

  const query = "SELECT IFNULL(SUM(NoOfSeats), 0) AS totalBookedSeats FROM Booking WHERE ScreeningID = ?";
  connection.query(query, [screeningID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching booked seats");
    }
    res.json({ totalBookedSeats: result[0].totalBookedSeats });
  });
};

//Seconds
//Minutes
//Hours
//Days
//Months
//Day of week Sunday 0 Saturday 6

//CronJob("00 00 0 * * 0")

const job = new CronJob("00 00 0 * * 0", function () {

  const query = "DELETE FROM Booking";
  connection.query(query, function (err, result) {
    if (err) {
      console.error("Error deleting bookings:", err);
    } else {
      console.log("All bookings deleted successfully.");
    }
  });
});
