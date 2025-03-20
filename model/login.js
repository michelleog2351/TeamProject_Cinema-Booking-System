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

exports.loginUser = function (req, res) {
  const { email, password } = req.body;

  connection.query('SELECT * FROM User WHERE Email = ?', [email], function (err, rows) {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error checking credentials' });
      }

      if (rows.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = rows[0];

      if (user.Password.toLowerCase() !== password.toLowerCase()) {
          return res.status(401).json({ error: 'Invalid email or password' });
      }

      if (user.Role.toLowerCase() !== 'admin' && user.Role.toLowerCase() !== 'manager') {
          return res.status(403).json({ error: 'Forbidden: Invalid role' });
      }

      res.json({ message: 'Login successful', role: user.Role });

  });
};
