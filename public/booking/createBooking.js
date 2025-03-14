$(document).ready(function () {
  nav();
  footer();
  var ID = localStorage.getItem("ViewScreeningID");
  getTicketTypeData();
  getScreeningData(ID);

  $("#noOfSeats").on("input", function () {
    let seats = parseInt($(this).val()) || 0; // Ensure value entered is a number
    let totalCost = seats * 1.5; // €1.50 per seat to test
    $("#cost").val(totalCost.toFixed(2)); // Set cost value with 2 d.p.
  });

  $("#cancel").click(function () {
    location.replace("http://localhost:3000/Customer/Film/cFilm.html");
  });

  $("#save").click(function () {
    //NOTE
    //HAVE to post to screening the seats remianing change

    // Check system time and check scrrening time if 

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

function getTicketTypeData() {
  $.getJSON(`http://localhost:3000/ticketTypes`, function (data) {
    $.each(data, async function (i, value) {
      $(`#ticketTableBody`).append(
        `<tr>
        <td id="filmID${value.Name}">${value.Name}</td>
        <td id="startTime${value.Cost}">${value.Cost}</td>
        <td>
        <div class="d-flex align-items-center">
        <button class="subtract btn btn-danger" value=${i}>-</button>
        <input class="form-control  w-25" type="number" id="amount${i}" name="amount" min="0" max="100" readonly value="0">
        <button class="add btn btn-success" value=${i}>+</button>
        </div>
        </td>
        </tr>`
      );
    });
    $(".subtract").click(function (e) {
      i = e.target.value;
      var decrease = $(`#amount${i}`).val()-1
      $(`#amount${i}`).val(decrease)
      console.log(decrease)
      console.log($(`#amount${i}`).val())

      
    });
  
    $(".add").click(function (e) {
      i = e.target.value;

      var increase = $(`#amount${i}`).val()+1
      $(`#amount${i}`).value(increase)
      console.log(increase)
      console.log($(`#amount${i}`).val())
    });
  
  });

}

function getScreeningData(ID) {
  $.getJSON(`http://localhost:3000/screening/${ID}`, async function (data) {
    // Ensure data is an object, and access it directly
    let screeningDate = new Date(data.Date);
    let formattedDate = screeningDate.toISOString().split("T")[0];
    let filmname = await getFilmData(data.FilmID);

    $(`#tbody`).append(
      `<tr>
      <td id="filmID${filmname}">${filmname}</td>
      <td id="startTime${data.StartTime}">${data.StartTime}</td>
      <td id="date${formattedDate}">${formattedDate}</td>
      <td id="theatreID${data.TheatreID}">${data.TheatreID}</td>
      <td id="seatsRemaining${data.SeatsRemaining}">${data.SeatsRemaining}</td>
      </tr>`
    );
  });
}

async function getFilmData(ID) {
  data = await $.getJSON(`http://localhost:3000/film/${ID}`);
  return data.Name;
}

function updatePrice() {}
