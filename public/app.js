$(document).ready(function () {
  nav();
  footer();
  filmDD();
  dateDD();
  startTimeDD();
  bookTickets();
});

function filmDD() {
  $.getJSON("http://localhost:3000/films", function (data) {
    // Sort films alphabetically
    data.sort((a, b) => a.Name.localeCompare(b.Name));

    let selectFilm = $("#selectFilm");
    let filmCards = $("#filmCards");

    selectFilm.html('<option value="" selected>Show All Films</option>');
    filmCards.empty();

    $.each(data, function (i, film) {
      selectFilm.append(`<option value="${film.FilmID}">${film.Name}</option>`);

      // Display all film cards initially
      filmCards.append(createFilmCard(film));
    });
  });

  // Handle dropdown film selection change
  $("#selectFilm").change(function () {
    let filmID = $(this).val();
    let filmCards = $("#filmCards");

    $("#selectDate").html('<option value="" selected>Select Date</option>');
    $("#selectStartTime").html(
      '<option value="" selected>Select Time</option>'
    );

    filmCards.empty(); // Clear existing cards

    $.getJSON("http://localhost:3000/films", function (data) {
      if (filmID) {
        // Show only the selected film
        let selectedFilm = data.find((film) => film.FilmID == filmID);
        if (selectedFilm) filmCards.append(createFilmCard(selectedFilm));

        fetchScreenings(filmID);
        dateDD(filmID);
      } else {
        // Show all films again
        $.each(data, function (i, film) {
          filmCards.append(createFilmCard(film));
        });

        $("#screeningsTbody").empty();
      }
    });
  });
}

// Helper function to create film card
function createFilmCard(film) {
  return `
    <br />
    <div class="col-md-2 col-sm-6 mb-3">
      <div class="card">
        <img src="images/${film.Name.replace(/\s+/g, "_")}.jpg" 
          class="card-img-top img-fluid w-100"
          alt="${film.Name}"
          style="height: 400px; object-fit: cover; border-radius: 10px;"
        />
        <div class="overlay">
          <div class="overlay-content">
            <a href="Customer/Film/filmDetails.html?filmID=${film.FilmID}"
            class="btn btn-primary">Watch: ${film.Name} Now</a> 
          </div>           
        </div>
      </div> 
    </div>`;
}

function dateDD(filmID) {
  if (!filmID) {
    $("#selectDate").html('<option value="" selected>Select Date</option>');
  }

  $.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
    let selectDate = $("#selectDate");
    selectDate.html('<option value="" selected>Select Date</option>');

    let specificDates = [];

    $.each(data, function (i, screening) {
      let date = new Date(screening.Date).toISOString().split("T")[0];

      // check if its present in the array
      if (!specificDates.includes(date)) {
        specificDates.push(date); // add this to the array
        selectDate.append(`<option value="${date}">${date}</option>`);
      }
    });
  });

  // updating available times dynamically based on selected date
  $("#selectDate").change(function () {
    let filmID = $("#selectFilm").val();
    let selectDate = $(this).val();
    startTimeDD(filmID, selectDate);
  });
}

function startTimeDD(filmID, selectDate) {
  if (!filmID || !selectDate) {
    $("#selectStartTime").html(
      '<option value="" selected>Select Time</option>'
    );
    return; // this stops any unnecessary API calls
  }

  $.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
    $("#selectStartTime").html(
      '<option value="" selected>Select Time</option>'
    );
    $.each(data, function (i, screening) {
      let screeningDate = new Date(screening.Date).toISOString().split("T")[0];

      if (screeningDate === selectDate) {
        $("#selectStartTime").append(
          `<option value="${screening.StartTime}">${screening.StartTime}</option>`
        );
      }
    });
  });
}

function fetchScreenings(filmID) {
  $("#screeningsTBody").empty(); // Clear existing rows

  if (!filmID) {
    $("#filmRows").addClass("d-none"); // Hide table if no film selected
    return;
  }

  $.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
    if (data.length > 0) {
      $("#filmRows").removeClass("d-none");
      $.each(data, function (i, value) {
        let formattedDate = new Date(value.Date).toISOString().split("T")[0];
        $("#screeningsTBody").append(`
          <tr>
            <td>${value.StartTime}</td>
            <td>${formattedDate}</td>
            <td>${value.SeatsRemaining}</td>
            <td>${value.TheatreID}</td>
            <td><button class="btn btn-primary book-btn" id="${value.ScreeningID}">Book</button></td>
          </tr>
        `);
      });
    } else {
      $("#filmRows").addClass("d-none");
    }
  });
}

function bookTickets() {
  $(".book-tickets-btn").click(function () {
    var filmID = $("#selectFilm").val();
    var date = $("#selectDate").val();
    var time = $("#selectStartTime").val();

    if (filmID && date && time) {
      window.location.href = `Customer/Film/filmDetails.html?filmID=${filmID}&date=${date}&time=${time}`;
    } else {
      alert("Please select a film, date, and time.");
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

$(document).on("click", ".book-btn", function () {
  let screeningID = $(this).data("id");
  window.location.href = `Customer/Film/filmDetails.html?screeningID=${screeningID}`;
});
