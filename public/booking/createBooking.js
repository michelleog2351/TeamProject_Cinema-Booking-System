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
      return;
    }
    if (totalNumberOfSeats == 0) {
      return;
    }
    if (totalNumberOfSeats > parseInt($(`#seatsRemaining`).text())) {
      return;
    }

    let today = new Date();
    let selectedDate = $("#date").text();
    let selectedTime = $("#startTime").text();
    let dateParts = selectedDate.split("/");
    let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    let screeningDateTime = new Date(`${formattedDate}T${selectedTime}`);
    
    if (screeningDateTime < today) {
      $("#error-message")
				.text("The screening has already began. Please try again.")
				.show();
      return;
    }

  const email = $("#email").val();
  const cost = parseFloat($("#totalCost").text());


    sessionStorage.setItem("pendingBooking", JSON.stringify({
      noOfSeats: totalNumberOfSeats,
      cost: cost,
      email: email,
      screeningID: ID,
    }));
  
    const stripe = Stripe("pk_test_51RA4naAHOjFm0Kcv0pXyQ6m0ZgAv7YwDv4RZwRC82t1btsYl7WC62MAhuHLfT9QXxd1tHpzkyMgQkXcPtqO8J4fD00dMKWuNur");
  
    $.post("http://localhost:3000/create-checkout-session", {
      email: email,
      amount: cost,
    }).done(function (data) {
      stripe.redirectToCheckout({ sessionId: data.id });
    }).fail(function () {
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
    let screeningDate = new Date(data.Date);
    let formattedDate = screeningDate.toLocaleString('en-GB', {
      timeZone: 'Europe/London', 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric'
    });
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

$("#save").click(function() {

  let email = $("#email").val();
  let totalCost = parseFloat($("#totalCost").text());

  if (!email) {
    $("#error-message")
				.text("Please enter your email.")
				.show();
    return;
  }

  if (totalNumberOfSeats === 0) {
    $("#error-message")
				.text("Please choose your tickets.")
				.show();
    return;
  }

  let bookingDetails = {
    email: email,
    totalCost: totalCost
  };

  fetch("http://localhost:3000/send-receipt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingDetails)
  })
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => alert("Error: " + error));
});

function updateSeatsRemaining(screeningID, newSeatsRemaining) {
  let updateSeatsRemaining = {
    screeningID: screeningID,
    seatsRemaining: newSeatsRemaining,
  };
  $.post(`http://localhost:3000/seatsRemaining`, updateSeatsRemaining);
}