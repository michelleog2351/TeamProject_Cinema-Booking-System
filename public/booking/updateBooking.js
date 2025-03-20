$(`document`).ready(function () 
{
  nav();
  footer();
  var ID = localStorage.getItem("BookingID");

  // check if ID is valid
  if (!ID) {
    alert("Booking ID is missing. Please try again.");
    location.replace("http://localhost:3000/booking.html");
    return;
  }

  $(`#fbody`).append(
    `<div class="mb-3">
					<label class="form-label" for="bookingID">Booking ID</label>
					<input
						class="form-control"
						type="text"
						id="bookingID"
						name="bookingID"
						readonly
					/>
				</div>

				<div class="mb-3">
					<label class="form-label" for="noOfSeats">Number of Seats</label>
					<input
						class="form-control"
						type="number"
						id="noOfSeats"
						name="noOfSeats"
						placeholder="Enter number of seats"
						min="1"
						required
					/>
				</div>

				<div class="mb-3">
					<label class="form-label" for="cost">Total Cost (€) </label>
					<input
						class="form-control"
						type="number"
						id="cost"
						name="cost"
						placeholder="Enter total cost"
						step="0.01"
						required
					/>
				</div>

				<div class="mb-3">
					<label class="form-label" for="email">Email</label>
					<input
						class="form-control"
						type="email"
						id="email"
						name="email"
						placeholder="Enter email address"
						required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
					/>
				</div>
		<br>`
  );

  getJsonData(ID);

  $("#noOfSeats").on("input", function () {
    let seats = parseInt($(this).val()) || 0; // Ensure value entered is a number
    let totalCost = seats * 1.5; // €1.50 per seat to test
    $("#cost").val(totalCost.toFixed(2)); // Set cost value with 2 d.p.
  });

  $("#cancel").click(function () {
    location.replace("http://localhost:3000/booking.html");
  });

  $("#update").click(function () {
    let noOfSeats = $("#noOfSeats").val().trim();
    let cost = $("#cost").val().trim();
    let email = $("#email").val().trim();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // regex pattern - email

    if (!noOfSeats || !cost || !email) {
      alert("All fields are required!");
      return;
    }

    if (!noOfSeats || parseInt(noOfSeats) < 1) {
      alert("Please enter a valid number of seats.");
      return;
    }

    if (!cost || parseFloat(cost) <= 0) {
      alert("Total cost cannot be empty or zero.");
      return;
    }

    if (!email || !emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    $.ajax({
      url: `http://localhost:3000/updateBooking/${ID}`,
      type: "PUT",
      data: {
        noOfSeats,
        cost,
        email,
      },
      success: function () {
        location.replace("http://localhost:3000/booking.html");
      },
      error: function (xhr) {
        let errorMessage = xhr.responseJSON
          ? xhr.responseJSON.message
          : "Error updating booking.";
        alert(errorMessage);
      },
    });
  });
});

function getJsonData(ID) {
  $.getJSON(`http://localhost:3000/booking/${ID}`, function (data) {
    $("#bookingID").val(data.BookingID);
    $("#noOfSeats").val(data.NoOfSeats);
    $("#cost").val(data.Cost);
    $("#email").val(data.Email);
  }).fail(function () {
    alert("Error fetching booking details.");
    location.replace("http://localhost:3000/booking.html");
  });
}
