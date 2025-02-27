var express = require("express");
var bodyParser = require("body-parser");
var _ = require('underscore');
var cors = require("cors");

var admin = require('./model/admin');
var film = require('./model/film');
var screening = require('./model/screening');
var Theatre = require('./model/theatre');
// var ticket = require('./model/ticket');
 var manager = require('./model/manager');
// var booking = require('./model/booking');
// var ticketType = require('./model/ticketType');

var app = express();
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/admin/:adminID", function(req,res){
	admin.getAdmin(req,res);
});

app.get("/admins", function(req,res){
	admin.getAdmins(req,res);
});

app.post("/updateAdmin/:adminID", function(req, res) {
    admin.updateAdmin(req, res);
});

app.post("/createAdmin/:name?/:username?/:password?", function(req,res){
	admin.createAdmin(req,res);
});

app.post("/deleteAdmin/:adminID", function(req, res){
    admin.deleteAdmin(req, res);
});

app.get("/films", function(req,res){
    film.getFilms(req, res);
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
var myServer = app.listen(3000, function() {
    console.log("Server listening on port 3000");
  });


  app.get("/screening/:screeningID", function(req,res){
	screening.getScreening(req,res);
});

app.get("/screenings", function(req,res){
	screening.getScreenings(req,res);
});

app.get("/filmScreenings/:filmID", function(req,res){
	screening.getFilmScreening(req,res);
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


app.get("/manager/:managerID", function(req,res){
	manager.getManager(req,res);
});

app.get("/managers", function(req,res){
	manager.getManagers(req,res);
});

app.post("/updateManager/:managerID", function(req, res) {
    manager.updateManager(req, res);
});

app.post("/createManager/:name?/:username?/:password?", function(req,res){
	manager.createManager(req,res);
});

app.post("/deleteManager/:managerID", function(req, res){
    manager.deleteManager(req, res);
});



app.post("/login/admin", function (req, res) {
    const { email, password } = req.body;

    admin.getAdmins((admins) => {
        const adminUser = admins.find((a) => a.Email === email && a.Password === password);
        if (adminUser) {
            const token = "some_generated_token";  
            return res.json({ message: "Login successful", token });
        }
        res.status(401).json({ error: "Invalid email or password" });
    });
});

app.post("/login/manager", function (req, res) {
    const { email, password } = req.body;

    manager.getManagers((managers) => {
        const managerUser = managers.find((m) => m.Email === email && m.Password === password);
        if (managerUser) {
            const token = "some_generated_token";  
            return res.json({ message: "Login successful", token });
        }
        res.status(401).json({ error: "Invalid email or password" });
    });
});
