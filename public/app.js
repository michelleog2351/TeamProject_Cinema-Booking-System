$(document).ready(function () {
  nav();
  footer();
  filmDD();
  dateDD();
  startTimeDD();
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
									class="overlay-button btn btn-success">Watch: ${film.Name} Now</a> 
								</div>           
							</div>
						</div> 
					</div>
				</div>`
      );
    });
  });
}

function dateDD() {
  $.getJSON("http://localhost:3000/screenings", function (data) {
    //const today = new Date().toISOString().split("T")[0]; // Get today's date

    $("#selectDate").html(
      '<option value="screenings" selected>Select Date</option>'
    );

    $.each(data, function (i, screening) {
      let date = new Date(screening.Date).toISOString().split("T")[0];
      // if (date >= today) {
      // Only show today or future dates
      $("#selectDate").append(`<option value="${date}">${date}</option>`);
      //}
    });
  });
}

function startTimeDD() {
  const now = new Date();
  const currentTime = now.toTimeString().split(" ")[0]; // Current time in HH:MM:SS

  $.getJSON("http://localhost:3000/startTimes", function (data) {
    $("#selectStartTime").html(
      '<option value="" selected>Select Time</option>'
    );

    $.each(data, function (i, screening) {
      // Only show times later than the current time for today
      if (screening.Date === now.toISOString().split("T")[0]) {
        if (screening.StartTime > currentTime) {
          $("#selectStartTime").append(
            `<option value="${screening.StartTime}">${screening.StartTime}</option>`
          );
        }
      } else {
        // For future dates, show all times
        $("#selectStartTime").append(
          `<option value="${screening.StartTime}">${screening.StartTime}</option>`
        );
      }
    });
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
