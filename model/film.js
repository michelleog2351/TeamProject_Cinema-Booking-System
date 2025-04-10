var mysql = require("mysql2");
const { CronJob } = require("cron");
const multer = require("multer");
const path = require("path");

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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

exports.getFilms = function (req, res) {
  connection.query("SELECT * FROM film", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};

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

exports.createFilm = function (req, res) {
  upload.single("coverImage")(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file");
    }

    var name = req.body.name;
    var category = req.body.category;
    var runningTime = req.body.runningTime;
    var genre = req.body.genre;
    var director = req.body.director;
    var videoURL = req.body.videoURL;
    var ReleaseDate = req.body.ReleaseDate;
    var Description = req.body.Description;
    var Starring = req.body.Starring;

    var coverImage = req.file ? req.file.filename : null;

    if (!coverImage) {
      return res.status(400).send("No image uploaded");
    }

    const query = `INSERT INTO film (Name, Category, RunningTime, Genre, Director, CoverImage, VideoURL, ReleaseDate, Description, Starring) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      query,
      [
        name,
        category,
        runningTime,
        genre,
        director,
        coverImage,
        videoURL,
        ReleaseDate,
        Description,
        Starring,
      ],
      function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error adding film");
        }
        res.send({ message: "Film added", filmID: result.insertId });
      }
    );
  });
};

exports.updateFilm = function (req, res) {
  upload.single("coverImage")(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file");
    }

    const filmID = req.params.filmID;
    const {
      name,
      category,
      runningTime,
      genre,
      director,
      videoURL,
      ReleaseDate,
      Description,
      Starring,
    } = req.body;

    const coverImage = req.file ? req.file.filename : null;

    let query, values;

    if (coverImage) {
      query = `UPDATE film 
        SET Name = ?, Category = ?, RunningTime = ?, Genre = ?, Director = ?, CoverImage = ?, VideoURL = ?, ReleaseDate = ?, Description = ?, Starring = ?
        WHERE FilmID = ?`;
      values = [
        name, category, runningTime, genre, director,
        coverImage, videoURL, ReleaseDate, Description, Starring, filmID
      ];
    } else {
      query = `UPDATE film 
        SET Name = ?, Category = ?, RunningTime = ?, Genre = ?, Director = ?, VideoURL = ?, ReleaseDate = ?, Description = ?, Starring = ?
        WHERE FilmID = ?`;
      values = [
        name, category, runningTime, genre, director,
        videoURL, ReleaseDate, Description, Starring, filmID
      ];
    }

    connection.query(query, values, function (err, result) {
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
};

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

exports.getAgeRatings = function (req, res) {
  connection.query("SELECT * FROM AgeRating", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};

exports.getRunningMinutes = function (req, res) {
  connection.query("SELECT * FROM RunningTime", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};

exports.getFilmCategories = function (req, res) {
  connection.query("SELECT * FROM Category", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting films");
    }
    res.json(rows);
  });
};

//CronJob("00 00 0 * * 0")

const job = new CronJob("00 00 0 * * 0", function () {

  const query = "DELETE FROM Film";
  connection.query(query, function (err, result) {
    if (err) {
      console.error("Error deleting films:", err);
    } else {
      console.log("All films deleted successfully.");
    }
  });
});