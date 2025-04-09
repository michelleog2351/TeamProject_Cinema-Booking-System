$(document).ready(function () {
    nav();
    footer();
    const booking = JSON.parse(sessionStorage.getItem("pendingBooking"));



    if (booking) {
      $.post("http://localhost:3000/createBooking", booking)
        .done(

            $.post("http://localhost:3000/seatsRemaining", {
                screeningID: booking.screeningID,
                seatsRemaining: (booking.currentSeatsRemaining - booking.noOfSeats),
              }).done(function () {
                setTimeout(redirect, 4000);
              })
        )
  }});

function redirect() {
    location.replace("http://localhost:3000/Customer/Film/cFilm.html");
}