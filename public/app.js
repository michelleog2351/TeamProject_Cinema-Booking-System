$(document).ready(function () {
  nav();
  footer();
  filmDD();
  dateDD();
  startTimeDD();
});

function filmDD() {
  $.getJSON("http://localhost:3000/films", function (data) {
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
									class="overlay-button btn">Watch: ${film.Name} Now</a> 
								</div>           
							</div>
						</div> 
						<h5 class="card-title">${film.Name}</h5>
					</div>
				</div>`
      );
    });
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
  $.getJSON("http://localhost:3000/screenings", function (data) {
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

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
