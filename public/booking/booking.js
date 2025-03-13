$(document).ready(function () {
  nav();
  footer();
  getJsonData();
  $(`#add`).append(
    `<button value="" class="addButton btn btn-primary">Create Booking</button>`
  );

  $(document).on("click", ".addButton", function () {
    location.replace("http://localhost:3000/createBooking.html");
  });
});

function getJsonData() {
  $.getJSON(`http://localhost:3000/bookings`, function (data) {
    $.each(data, function (i, value) {
      $(`#tbody`).append(
        `<tr>
				<td id="bookingID" >${value.BookingID}</td>
				<td id="noOfSeats${value.NoOfSeats}">${value.NoOfSeats}</td>
				<td id="cost${value.Cost}">€${value.Cost}</td>
				<td id="email${value.Email}">${value.Email}</td>

				<td><button type="button" class="updateButton btn btn-secondary" value="${value.BookingID}">Edit</button></td>
				<td><button type="button" class="deleteButton btn btn-danger" value="${value.BookingID}">Delete</button></td>
				</tr>`
      );
    });

    $(".updateButton").click(function (e) {
      let ID = e.target.value;
      localStorage.setItem("BookingID", ID);
      location.replace("http://localhost:3000/updateBooking.html");
    });

    $(".deleteButton").click(function (e) {
      let ID = e.target.value;
      $.post(`http://localhost:3000/deleteBooking/${ID}`, {
        BookingID: ID,
      }).done(function () {
        location.replace("http://localhost:3000/booking.html");
      });
    });
  });
}
