$(document).ready(function () 
{
  nav();
  footer();
  var ID = localStorage.getItem("ScreeningID");
  
  $("#fbody").append(`
	

				<div class="mb-3">
					<label class="form-label" for="noOfSeats">No. Seats</label>
					<input
						class="form-control"
						type="number"
						id="noOfSeats"
						name="noOfSeats"
						placeholder="Enter total number of seats"
						min="1"
						required
					/>
				</div>

				<div class="mb-3">
					<label class="form-label" for="cost">Total Cost (€)</label>
					<input
						class="form-control"
						type="number"
						id="cost"
						name="cost"
						placeholder="Total cost (€)"
						step="0.01"
						required
						readonly
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
						required"	
					/>
				</div>
        <br>
    `);

  $("#noOfSeats").on("input", function () {
    let seats = parseInt($(this).val()) || 0; // Ensure value entered is a number
    let totalCost = seats * 1.5; // €1.50 per seat to test
    $("#cost").val(totalCost.toFixed(2)); // Set cost value with 2 d.p.
  });

  $("#cancel").click(function () {
    location.replace("http://localhost:3000/Customer/Film/cFilm.html");
  });

  $("#save").click(function () {
    let noOfSeats = $("#noOfSeats").val().trim();
    let cost = $("#cost").val().trim();
    let email = $("#email").val().trim();
    //let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!noOfSeats || isNaN(noOfSeats) || parseInt(noOfSeats) < 1) {
      alert("Please enter a valid number of seats.");
      return;
    }

    //   if (!cost || parseFloat(cost) <= 0) {
    // 	alert("Total cost cannot be empty or zero.");
    // 	return;
    //   }

    // if (!email.match(emailPattern)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }

    // create new booking object
    let newBooking = {
      noOfSeats: parseInt(noOfSeats),
      cost: parseFloat(cost).toFixed(2),
      email: email,
    };

    // $.post(`http://localhost:3000/createBooking`, newBooking)
    //   .done(function () {
    //     alert("Booking created successfully!");
    //     location.replace("http://localhost:3000/booking.html");
    //   })
    //   .fail(function () {
    //     alert("Error creating booking.");
    //   });

    $.ajax({
      url: "/createBooking",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(newBooking),
      success: function (response) {
        alert("Booking saved successfully!");
        location.replace("http://localhost:3000/booking.html");
      },
      error: function (xhr, status, error) {
        alert("Error saving booking: " + xhr.responseText);
      },
    });
  });
});
