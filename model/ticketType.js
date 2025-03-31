var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cinemaDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Successfully connected to MySQL database cinemaDB`);
});

exports.getTicketTickets = function (req, res) {
  connection.query("SELECT * FROM TicketType", function (err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
};

