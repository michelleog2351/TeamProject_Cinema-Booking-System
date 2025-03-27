var ticketPrices = [];
var totalNumberOfSeats = 0;
$(document).ready(function () {
  nav();
  footer();
  var ID = localStorage.getItem("ViewScreeningID");
  getTicketTypeData();
  getScreeningData(ID);

  $("#cancel").click(function () {
    location.replace("http://localhost:3000/Customer/Film/cFilm.html");
  });

  $("#save").click(function () {
    if (
      $("#email").val() == "" ||
      $("#email").val().indexOf("@") == -1 ||
      $("#email").val().indexOf("@atu.ie") == -1
    ) {
      alert("Must enter a valid email");
      return;
    }
    if (totalNumberOfSeats == 0) {
      alert("Must select a ticket to book");
      return;
    }
    if (totalNumberOfSeats > parseInt($(`#seatsRemaining`).text())) {
      alert("Not enough seats availble, try another screening");
      return;
    }

    let today = new Date();
    let currentTime = today.getTime();
    let selectedDate = $("#date").text();
    let selectedTime = $("#startTime").text();
    let screeningDateTime = new Date(`${selectedDate}T${selectedTime}Z`);

    if (screeningDateTime.getTime() <= currentTime) {
      alert("Screening has already begun");
      return;
    }

    let newBooking = {
      noOfSeats: totalNumberOfSeats,
      cost: parseFloat($(`#totalCost`).text()),
      email: $(`#email`).val(),
      screeningID: ID,
    };

    $.post(`http://localhost:3000/createBooking`, newBooking)
      .done(function () {
        alert("Booking created successfully!");
        console.log(parseInt($(`#seatsRemaining`).text()));
        console.log(newBooking.noOfSeats);
        console.log(
          parseInt($(`#seatsRemaining`).text() - newBooking.noOfSeats)
        );
        updateSeatsRemaining(
          ID,
          parseInt($(`#seatsRemaining`).text() - newBooking.noOfSeats)
        );
        location.replace("http://localhost:3000/booking/booking.html");
        location.replace("http://localhost:3000/Customer/Film/cFilm.html");
      })
      .fail(function () {
        alert("Error creating booking.");
      });
  });
});

function getTicketTypeData() {
  $.getJSON(`http://localhost:3000/ticketTypes`, function (data) {
    $.each(data, async function (i, value) {
      $(`#ticketTableBody`).append(
        `<tr>
        <td id="filmID${value.Name}">${value.Name}</td>
        <td class="cost" id="cost${i}">€${value.Cost}</td>
        <td>
        <div class="d-flex align-items-center justify-content-start">
        <button class="subtract btn btn-danger btn-sm" data-index="${i}" value="-1" style="width: 35px; height: 35px; font-size: 20px;">-</button>
        <input class="ticket-amount form-control w-25 mx-3" type="number" id="amount${i}" name="amount" min="0" max="10" readonly value="0" style="text-align: center; font-size: 16px;">
        <button class="add btn btn-success btn-sm" data-index="${i}" value="1" style="width: 35px; height: 35px; font-size: 20px;">+</button>
  </div>

        </td>
        </tr>`
      );
      ticketPrices = data.map(function (price) {
        return price.Cost;
      });
    });

    $(".subtract").click(changeTicketTotal);

    $(".add").click(changeTicketTotal);
  });

  function changeTicketTotal(e) {
    var index = $(e.target).data("index");
    var numberOfTickets = parseInt($(`#amount${index}`).val());
    var amount = parseInt(e.target.value);

    if (totalNumberOfSeats + amount > 10) {
      //alert("You can only book a maximum of 10 tickets across all ticket types.");
      return;
    }

    if (
      (numberOfTickets == 0 && amount == -1) ||
      (numberOfTickets == 10 && amount == 1)
    ) {
      return;
    }

    $(`#amount${index}`).val(numberOfTickets + amount);
    updatePrice();
  }
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
      <td><img src="../../images/${filmname.replace(
        /\s+/g,
        "_"
      )}.jpg" alt="Cover" width="50"></td>
      <td id="startTime">${data.StartTime}</td>
      <td id="date">${formattedDate}</td>
      <td id="theatreID${data.TheatreID}">${data.TheatreID}</td>
      <td id="seatsRemaining">${data.SeatsRemaining}</td>
      </tr>`
    );
  });
}

async function getFilmData(ID) {
  data = await $.getJSON(`http://localhost:3000/film/${ID}`);
  return data.Name;
}

function updatePrice() {
  var totalCost = 0;
  totalNumberOfSeats = 0;
  ticketPrices.forEach(function (item, index) {
    totalNumberOfSeats += parseInt($(`#amount${index}`).val());
    totalCost = parseFloat(totalCost + item * $(`#amount${index}`).val());
  });
  $(`#totalCost`).text(totalCost.toFixed(2));
}

function updateSeatsRemaining(screeningID, newSeatsRemaining) {
  let updateSeatsRemaining = {
    screeningID: screeningID,
    seatsRemaining: newSeatsRemaining,
  };
  $.post(`http://localhost:3000/seatsRemaining`, updateSeatsRemaining);
}
