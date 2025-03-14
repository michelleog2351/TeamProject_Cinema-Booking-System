var mysql = require("mysql2");
const path = require("path");

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

// Get all films
exports.getFilms = function (req, res) {
  connection.query("SELECT * FROM film", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};

// Get a single film by ID
exports.getFilm = function (req, res) {
  var filmID = req.params.filmID;
  const query = "SELECT * FROM film WHERE FilmID = ?";
  connection.query(query, [filmID], function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting film");
    }
    if (rows.length === 0) {
      return res.status(404).send({ message: "Film not found" });
    }
    res.json(rows[0]);
  });
};

// Add a new film with image upload
exports.createFilm = function (req, res) {
  if (!req.files || !req.files.image) {
    return res.status(400).send("No image uploaded.");
  }

  const { name, category, runningTime, genre, director, videoURL, ReleaseDate } = req.body;
  const image = req.files.image;

  // Define image upload path
  const uploadPath = path.join(__dirname, "../public/images", `${Date.now()}_${image.name}`);

  // Move image to the upload directory
  image.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    const imagePath = `/images/${Date.now()}_${image.name}`; // Store relative path for serving

    const query = "INSERT INTO film (Name, Category, RunningTime, Genre, Director, CoverImage, VideoURL, ReleaseDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      query,
      [name, category, runningTime, genre, director, imagePath, videoURL, ReleaseDate],
      function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error adding film");
        }
        res.send({ message: "Film added successfully!", filmID: result.insertId });
      }
    );
  });
};

// Update film details
exports.updateFilm = function (req, res) {
  var filmID = req.params.filmID;
  var { name, category, runningTime, genre, director, videoURL, ReleaseDate } = req.body;

  let query = "UPDATE film SET Name = ?, Category = ?, RunningTime = ?, Genre = ?, Director = ?, VideoURL = ?, ReleaseDate = ? WHERE FilmID = ?";
  let queryParams = [name, category, runningTime, genre, director, videoURL, ReleaseDate, filmID];

  // Check if an image is uploaded
  if (req.files && req.files.image) {
    const image = req.files.image;
    const uploadPath = path.join(__dirname, "../public/images", `${Date.now()}_${image.name}`);
    
    image.mv(uploadPath, (err) => {
      if (err) return res.status(500).send(err);

      const imagePath = `/images/${Date.now()}_${image.name}`;
      query = "UPDATE film SET Name = ?, Category = ?, RunningTime = ?, Genre = ?, Director = ?, CoverImage = ?, VideoURL = ?, ReleaseDate = ? WHERE FilmID = ?";
      queryParams = [name, category, runningTime, genre, director, imagePath, videoURL, ReleaseDate, filmID];

      connection.query(query, queryParams, function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error updating film");
        }
        if (result.affectedRows === 0) {
          return res.status(404).send({ message: "Film not found" });
        }
        res.send({ message: "Film updated successfully" });
      });
    });
  } else {
    connection.query(query, queryParams, function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating film");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Film not found" });
      }
      res.send({ message: "Film updated successfully" });
    });
  }
};

// Delete a film
exports.deleteFilm = function (req, res) {
  var filmID = req.params.filmID;

  const query = "DELETE FROM film WHERE FilmID = ?";
  connection.query(query, [filmID], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting film");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Film not found" });
    }
    res.send({ message: "Film deleted successfully" });
  });
};

// Get age ratings
exports.getAgeRatings = function (req, res) {
  connection.query("SELECT * FROM AgeRating", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};

// Get running minutes
exports.getRunningMinutes = function (req, res) {
  connection.query("SELECT * FROM RunningTime", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};

// Get film categories
exports.getFilmCategories = function (req, res) {
  connection.query("SELECT * FROM Category", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};
