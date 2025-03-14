var express = require("express");
var bodyParser = require("body-parser");
var _ = require('underscore');
var cors = require("cors");
var login = require('./model/login');
var film = require('./model/film');
var screening = require('./model/screening');
var Theatre = require('./model/theatre');
// var ticket = require('./model/ticket');
 var user = require('./model/user');
// var booking = require('./model/booking');
// var ticketType = require('./model/ticketType');


var app = express();
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//ADMIN ROUTES


app.get("/films", function(req,res){
    film.getFilms(req, res);
});

app.get("/ageRatings", function(req,res){
    film.getAgeRatings(req, res);
});

app.get("/runningMinutes", function(req,res){
    film.getRunningMinutes(req, res);
});

app.get("/category", function(req,res){
    film.getFilmCategories(req, res);
});

app.get("/film/:filmID", function(req,res){
	film.getFilm(req,res);
});

app.post("/updateFilm/:filmID", function(req, res) {
    film.updateFilm(req, res);
});

app.post("/createFilm", function(req, res) {
    film.createFilm(req, res);
});

app.post("/deleteFilm/:filmID", function (req, res) {
    film.deleteFilm(req, res);
});


////////////////////////////////////////////////////////////

//Screening Routes


////////////////////////////////////////////////////////////

  app.get("/screening/:screeningID", function(req,res){
	screening.getScreening(req,res);
});

app.get("/screenings", function(req,res){
	screening.getScreenings(req,res);
});

app.get("/startTimes", function(req,res){
	screening.getStartTime(req,res);
});

app.get("/filmScreenings/:filmID", function(req,res){
	screening.getFilmScreening(req,res);
});

app.post("/checkScreeningAvailability", function(req,res){
	screening.checkScreeningAvailability(req,res);
});

app.post("/checkUpdateScreeningAvailability", function(req,res){
	screening.checkUpdateScreeningAvailability(req,res);
});

app.get("/filmRunningTime/:filmID", function(req,res){
	screening.checkRunningTime(req,res);
});

app.post("/updateScreening/:screeningID", function(req, res) {
    screening.updateScreening(req, res);
});

app.post("/createScreening", function(req,res){
	screening.createScreening(req,res);
});

app.post("/deleteScreening/:screeningID", function(req, res){
    screening.deleteScreening(req, res);
});


////////////////////////////////////////////////////////////


//Theatre Routes


////////////////////////////////////////////////////////////

app.get("/theatre/:TheatreID", function(req, res){
    Theatre.getTheatre(req, res);
});

app.get("/theatres", function(req, res){
    Theatre.getTheatres(req, res);
});

app.post("/updateTheatre/:TheatreID", function(req, res){
    Theatre.updateTheatre(req, res);
});

app.post("/createTheatre", function(req, res){
    Theatre.createTheatre(req, res);
});

app.post("/deleteTheatre/:TheatreID", function(req, res){
    Theatre.deleteTheatre(req, res);
});

app.get("/theatreCapacity/:TheatreID", function(req,res){
    Theatre.getTheatreCapacity(req, res);
});

app.get("/capacity", function(req,res){
    Theatre.getCapacity(req, res);
});




app.get("/user/:EmployeeID", function(req,res){
	user.getUser(req,res);
});

app.get("/users", function(req,res){
	user.getUsers(req,res);
});

app.post("/updateUser/:EmployeeID", function(req, res) {
    user.updateUser(req, res);
});

app.post("/createUser/:name?/:username?/:password?/:role?", function(req,res){
	user.createUser(req,res);
});

app.post("/deleteUser/:EmployeeID", function(req, res){
    user.deleteUser(req, res);
});

////////////////////////////////////////////////////////////

app.post("/login", function (req, res) {
    const { email, password, role } = req.body;

    //console.log(req.body); // Just for debugging to see incoming data

    // Check the userType and call the appropriate login function
    if (role === 'admin') {
        login.loginAdmin(req, res);  // Admin login
    } else if (role === 'manager') {
        login.loginManager(req, res); // Manager login
    } else {
        return res.status(400).json({ error: "Invalid user type" });
    }
});


var myServer = app.listen(3000, function() {
    console.log("Server listening on port 3000");
  });