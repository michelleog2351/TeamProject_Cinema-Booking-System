$(document).ready(function () {
  nav();
  footer();
  getJsonData();
  $(`#add`).append(
    `<button value="" class="addButton btn btn-primary">Create Booking</button>`
  );

  $(document).on("click", ".addButton", function () {
    location.replace("http://localhost:3000/booking/createBooking.html");
  });
});

function getJsonData() {
  $.getJSON(`http://localhost:3000/bookings`, function (data) {
    $.each(data, function (i, value) {
      $(`#tbody`).append(
        `<tr>
				<td id="bookingID" >${value.BookingID}</td>
				<td id="noOfSeats${value.BookingID}">${value.NoOfSeats}</td>
				<td id="cost${value.Cost}">€${value.Cost}</td>
				<td id="email${value.Email}">${value.Email}</td>
        <td id="screening${value.BookingID}">${value.ScreeningID}</td>
				<td><button type="button" class="deleteButton btn btn-danger" value="${value.BookingID}">Delete</button></td>
				</tr>`
      );
    });

    $(".updateButton").click(function (e) {
      let ID = e.target.value;
      localStorage.setItem("BookingID", ID);
      location.replace("http://localhost:3000/booking/updateBooking.html");
    });

    $(".deleteButton").click(async function (e) {
      let ID = e.target.value;
      screeningID = parseInt($(`#screening${ID}`).text());
      screeningData = await $.getJSON(
        `http://localhost:3000/screening/${screeningID}`
      );

      newSeatsAvailable = parseInt($(`#noOfSeats${ID}`).text());
      SeatsRemaining = screeningData.SeatsRemaining;
      SeatsRemaining += newSeatsAvailable;
      updateSeatsRemaining(screeningID, SeatsRemaining);

      $.post(`http://localhost:3000/deleteBooking/${ID}`).done(function () {
        location.replace("http://localhost:3000/booking/booking.html");
      });
    });
  });
}

function updateSeatsRemaining(screeningID, newSeatsRemaining) {
  let updateSeatsRemaining = {
    screeningID: screeningID,
    seatsRemaining: newSeatsRemaining,
  };
  $.post(`http://localhost:3000/seatsRemaining`, updateSeatsRemaining);
}

$(document).ready(function () {
  var scrollTopBtn = $(".scroll-to-top-btn");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      scrollTopBtn.fadeIn().css("visibility", "visible");
    } else {
      scrollTopBtn.fadeOut().css("visibility", "hidden");
    }
  });

  scrollTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 120);
  });
});

