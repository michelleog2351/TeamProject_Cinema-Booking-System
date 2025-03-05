var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cinemaDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Successfully connected to MySQL database cinemaDB");
});

exports.loginAdmin = function (req, res) {
  const { email, password } = req.body;

  const query = "SELECT * FROM Admin WHERE Email = ? AND Password = ?";
  connection.query(query, [email, password], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error while logging in");
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful" }); // Token removed
  });
};

exports.loginManager = function (req, res) {
  const { email, password } = req.body;

  const query = "SELECT * FROM Manager WHERE Email = ? AND Password = ?";
  connection.query(query, [email, password], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error while logging in");
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful" }); // Token removed
  });
};
