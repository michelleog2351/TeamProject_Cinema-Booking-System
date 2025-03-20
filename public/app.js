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
    // sorts the film names in alphabetical order
    data.sort(function (a, b) {
      return a.Name.localeCompare(b.Name);
    });

    $("#selectFilm").html('<option value="" selected>Select Film</option>');

    $.each(data, function (i, film) {
      $("#selectFilm").append(
        `<option value="${film.FilmID}">${film.Name}</option>`
      );
    });
  });

  $("#selectFilm").change(function () {
    let filmID = $(this).val();
    
    // Clear any previous film cards
    $("#filmCards").empty();
    
    // If a film is selected, display its card
    if (filmID) {
      $.getJSON(`http://localhost:3000/films/${filmID}`, function (film) {      
        $("#filmCards").append(
        `<br />
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
					</div>
				</div>`
      );
    });
  }
  });
}

  // Trigger fetching screenings on film selection
  $("#selectFilm").change(function () {
    let filmID = $(this).val();
    fetchScreenings(filmID);
  });
}

function dateDD() {
  $.getJSON("http://localhost:3000/screenings", function (data) {
    $("#selectDate").html(
      '<option value="screenings" selected>Select Date</option>'
    );

    $.each(data, function (i, screening) {
      let date = new Date(screening.Date).toISOString().split("T")[0];
      $("#selectDate").append(`<option value="${date}">${date}</option>`);
    });
  });
}

function startTimeDD() {
  $.getJSON("http://localhost:3000/startTimes", function (data) {
    $("#selectStartTime").html(
      '<option value="" selected>Select Time</option>'
    );

    $.each(data, function (i, screening) {
      $("#selectStartTime").append(
        `<option value="${screening.StartTime}">${screening.StartTime}</option>`
      );
    });
  });
}

function fetchScreenings(filmID) {
  $("#screeningsTableBody").empty(); // Clear existing rows

  if (!filmID) {
    $("#screeningsContainer").addClass("d-none"); // Hide table if no film selected
    return;
  }

  $.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
    if (data.length > 0) {
      $("#filmRows").removeClass("d-none");
      $.each(data, function (i, value) {
        let formattedDate = new Date(value.Date).toISOString().split("T")[0];
        $("#screeningstBody").append(`
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
    behavior: "smooth",
  });
}

$(document).on("click", ".book-btn", function () {
  let screeningID = $(this).data("id");
  window.location.href = `Customer/Film/filmDetails.html?screeningID=${screeningID}`;
});
