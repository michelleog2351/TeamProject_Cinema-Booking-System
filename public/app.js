$(document).ready(function () {
  nav();
  footer();
  filmDD();
  dateDD();
  startTimeDD();
});

function filmDD() {
  $.getJSON("http://localhost:3000/films", function (data) {
    data.sort((a, b) => a.Name.localeCompare(b.Name));

    $("#selectFilm").html('<option value="" selected>Select Film</option>');

    $.each(data, function (i, film) {
      $("#selectFilm").append(
        `<option value="${film.FilmID}">${film.Name}</option>`
      );
//<img src="/images/${value.CoverImage.replace(/\s+/g, "_")}"<img src="images/${film.CoverImage}" />
      $("#filmCards").append(
        `<br />
				<div class="col-md-2 col-sm-6 mb-3">
					<div class="card">
						<img src="images/${film.CoverImage}" 
							class="card-img-top img-fluid w-100"
							alt="${film.Name}"
							style="height: 400px; object-fit: cover; border-radius: 10px;"
						/>
							<div class="overlay">
								<div class="overlay-content">
									<a href="Customer/Film/filmDetails.html?filmID=${film.FilmID}"
									class="btn btn-primary overlay-button">Watch: ${film.Name} Now</a> 
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
    data.sort((a, b) => a.Date.localeCompare(b.Date));

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
    data.sort((a, b) => a.StartTime.localeCompare(b.StartTime));

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

$(document).ready(function () {
  var scrollTopBtn = $(".scroll-to-top-btn");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      scrollTopBtn.fadeIn().css("visibility", "visible");
    } else {
      scrollTopBtn.fadeOut().css("visibility", "hidden");
    }
  });

  scrollTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 120);
  });
});
