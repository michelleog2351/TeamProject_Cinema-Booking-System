var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
var cors = require("cors");
const multer = require("multer");
var nodemailer = require("nodemailer");
var login = require("./model/login");
var film = require("./model/film");
var screening = require("./model/screening");
var Theatre = require("./model/theatre");
// var ticket = require('./model/ticket');
var booking = require("./model/booking");
var ticketType = require("./model/ticketType");
var user = require("./model/user");
var stripe = require('stripe')('sk_test_51RA4naAHOjFm0KcvxGrWP9tUACN3ZKBNezG5Nv1WvyRE3ULu4uURGLq6n7FvqHkX5faO5pdAKHFJEKtWfZMK7pk100kEHND3eu');




var app = express();
app.use(cors());
app.use("/images", express.static("public/images"));
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Email
app.post("/send-email", function (req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "retroreelsatu@gmail.com", 
      pass: "udkl siis jkfn wacj"
    }
  });

  let mailOptions = {
    from: "retroreelsatu@gmail.com",
    to: email,
    subject: "Welcome to RetroReels Cinema",
    text: "Thank you for signing up to our newsletter! We will keep you up to date with all new releases"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Email sending failed:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully!");
    }
  });
});

///Receipt

app.post("/send-receipt", function (req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "retroreelsatu@gmail.com", 
      pass: "udkl siis jkfn wacj"
    }
  });

  let mailOptions = {
    from: "retroreelsatu@gmail.com",
    to: email,
    subject: "Your booking has been confirmed",
    text: "Thank you for booking with Retro Reels!"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Email sending failed:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully!");
    }
  });
});
///

//Stripe
app.post('/create-checkout-session', async (req, res) => {
  const { email, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Cinema Ticket Booking',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:3000/creditcard/success.html',
      cancel_url: 'http://localhost:3000/Customer/Film/cFilm.html',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});


////

app.get("/films", function (req, res) {
  film.getFilms(req, res);
});

app.get("/ageRatings", function (req, res) {
  film.getAgeRatings(req, res);
});

app.get("/runningMinutes", function (req, res) {
  film.getRunningMinutes(req, res);
});

app.get("/category", function (req, res) {
  film.getFilmCategories(req, res);
});

app.get("/film/:filmID", function (req, res) {
  film.getFilm(req, res);
});

app.post("/updateFilm/:filmID", function (req, res) {
  film.updateFilm(req, res);
});

app.post("/createFilm", function (req, res) {
  film.createFilm(req, res);
});

app.post("/deleteFilm/:filmID", function (req, res) {
  film.deleteFilm(req, res);
});

////////////////////////////////////////////////////////////

//Screening Routes

////////////////////////////////////////////////////////////

app.get("/screening/:screeningID", function (req, res) {
  screening.getScreening(req, res);
});

app.get("/screenings", function (req, res) {
  screening.getScreenings(req, res);
});

app.get("/startTimes", function (req, res) {
  screening.getStartTime(req, res);
});

app.get("/filmScreenings/:filmID", function (req, res) {
  screening.getFilmScreening(req, res);
});

app.post("/checkScreeningAvailability", function (req, res) {
  screening.checkScreeningAvailability(req, res);
});

app.post("/checkUpdateScreeningAvailability", function (req, res) {
  screening.checkUpdateScreeningAvailability(req, res);
});

app.get("/filmRunningTime/:filmID", function (req, res) {
  screening.checkRunningTime(req, res);
});

app.post("/updateScreening/:screeningID", function (req, res) {
  screening.updateScreening(req, res);
});

app.post("/createScreening", function (req, res) {
  screening.createScreening(req, res);
});

app.post("/deleteScreening/:screeningID", function (req, res) {
  screening.deleteScreening(req, res);
});

app.post("/seatsRemaining", function (req, res) {
  screening.updateSeatsRemaining(req, res);
});

app.post("/screeningDates", function (req, res) {
  screening.getScreeningDates(req, res);
});

app.get("/ticketsSoldDaily", function (req, res) {
  screening.getTicketsSoldDaily(req, res);
});

////////////////////////////////////////////////////////////

//TicketType Routes

////////////////////////////////////////////////////////////

app.get("/ticketTypes", function (req, res) {
  ticketType.getTicketTickets(req, res);
});

////////////////////////////////////////////////////////////

//Booking Routes

////////////////////////////////////////////////////////////

app.get("/bookings", function (req, res) {
  booking.getBookings(req, res);
});

app.get("/booking/:bookingID", function (req, res) {
  booking.getBooking(req, res);
});

app.post("/createBooking", function (req, res) {
  booking.createBooking(req, res);
});

app.post("/updateBooking/:BookingID", function (req, res) {
  booking.updateBooking(req, res);
});

app.post("/deleteBooking/:bookingID", function (req, res) {
  booking.deleteBooking(req, res);
});

app.post("/deleteAllBookings", function (req, res) {
  booking.deleteAllBookings(req, res);
});

app.get("/bookedSeats/:ScreeningID", function (req, res) {
  booking.bookedSeats(req, res);
});

////////////////////////////////////////////////////////////

//Theatre Routes

////////////////////////////////////////////////////////////

app.get("/theatre/:TheatreID", function (req, res) {
  Theatre.getTheatre(req, res);
});

app.get("/theatres", function (req, res) {
  Theatre.getTheatres(req, res);
});

app.post("/updateTheatre/:TheatreID", function (req, res) {
  Theatre.updateTheatre(req, res);
});

app.post("/createTheatre", function (req, res) {
  Theatre.createTheatre(req, res);
});

app.post("/deleteTheatre/:TheatreID", function (req, res) {
  Theatre.deleteTheatre(req, res);
});

app.get("/theatreCapacity/:TheatreID", function (req, res) {
  Theatre.getTheatreCapacity(req, res);
});

app.get("/capacity", function (req, res) {
  Theatre.getCapacity(req, res);
});

app.get("/user/:EmployeeID", function (req, res) {
  user.getUser(req, res);
});

app.get("/users", function (req, res) {
  user.getUsers(req, res);
});

app.post("/updateUser/:EmployeeID", function (req, res) {
  user.updateUser(req, res);
});

app.post(
  "/createUser/:name?/:username?/:password?/:role?",
  function (req, res) {
    user.createUser(req, res);
  }
);

app.post("/deleteUser/:EmployeeID", function (req, res) {
  user.deleteUser(req, res);
});

////////////////////////////////////////////////////////////

app.post("/login", function (req, res) {
  const { email, password } = req.body;

  console.log(req.body);

  login.loginUser(req, res);
});

////////////////////////////////////////////////////////////

//STRIPE


////////////////////////////////////////////////////////////
var myServer = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
