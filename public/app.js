$(document).ready(function () {
  nav();
  footer();
  filmDD();
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

  // Handle films dropdown
  $("#selectFilm").change(function () {
    let filmID = $(this).val();
    let filmCards = $("#filmCards");
    filmCards.empty(); // clear existing ones

    if (filmID) {
      $.getJSON(`http://localhost:3000/film/${filmID}`, function (film) {
        $("#filmRows").html(`
				<div class="container mt-4">
						<div class="row">
							<div class="col-md-4">

									<div class="position-relative">
										 <img src="/images/${film.CoverImage.replace(
                       /\s+/g,
                       "_"
                     )}" alt="${film.Name}" class="card-img-top img-fluid" style="height: 500px; object-fit: contain; margin:0;">

										<div class="overlay">
											<div class="overlay-content">
												<a href="Customer/Film/filmDetails.html?filmID=${film.FilmID}"
												class="btn btn-primary overlay-button">Watch: ${film.Name} Now</a> 
											</div>           
										</div>
									</div>
							</div>

							<div class="col-md-8">
								<h2 class="fw-bold">${film.Name}</h2>
								<p>
								<img src="http://localhost:3000/images/${film.Genre.replace(/\s+/g, "_")}.jpg" 
									class="img-fluid rounded shadow" 
									alt="${film.Name}" 
									style="height:30px; width:30px;"> | ${film.Category} | ${film.RunningTime} mins
								</p>			
							<div id="screeningsTbody" class="mt-3"></div>
							</div>
					</div>
				</div>
			`);
      });

      fetchScreenings(filmID);
    } else {
      $.getJSON("http://localhost:3000/films", function (data) {
        // Show all films again with sorting
        $.each(
          data.sort((a, b) => a.Name.localeCompare(b.Name)),
          function (i, film) {
            filmCards.append(createFilmCard(film));
          }
        );
      });
      $("#screeningsTbody").empty();

      $("#filmRows").html("");
    }
  });
}

// Helper function to create film card
function createFilmCard(film) {
  return `
		<br />
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
		</div>`;
}

function fetchScreenings(filmID) {
  $("#screeningsTbody").empty(); // Clear existing rows

  if (!filmID) {
    $("#filmRows").addClass("d-none"); // Hide table if no film selected
    return;
  }

  $.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
    if (data.length > 0) {
      $("#filmRows").removeClass("d-none");

      // create an object that will store all the screenings grouped by date
      // using an array would be inefficient esp. in cases where there are multiple screenings for the same date,
      // when you can group you have multiple screenings for a single date
      let screeningsByDate = {};

      $.each(data, function (i, value) {
        let formattedDate = new Date(value.Date).toLocaleDateString("en-GB", {
          weekday: "long",
          month: "long",
          day: "numeric"
        });
        formattedDate = formattedDate.replace(/^(\w+)(?=\s)/, "$1,");

        if (!screeningsByDate[formattedDate]) {
          screeningsByDate[formattedDate] = [];
        }
        screeningsByDate[formattedDate].push(value);
      });

      $.each(screeningsByDate, function (date, screening) {
        let timeButtonsHtml = `<div class="d-flex flex-wrap mt-2">`;

        $.each(screening, function (i, value) {
          timeButtonsHtml += `
								<button class="btn btn-outline-primary mx-1 startTime-btn" data-id="${value.ScreeningID}">
										${value.StartTime}
								</button>
						`;
        });

        timeButtonsHtml += `</div>`;

        $("#screeningsTbody").append(`
						<tr>
								<td colspan="3"><strong>${date}</strong></td>
						</tr>
						<tr>
								<td colspan="3">Screen ${screening[0].TheatreID}</td>
						</tr>
						<tr>
								<td colspan="3">${timeButtonsHtml}</td>
						</tr>
						<tr>
								<td><hr></td>
						</tr>
				`);
      });
    } else {
      $("#filmRows").addClass("d-none");
    }
  });
}

$(document).on("click", ".startTime-btn", function () {
  let screeningID = $(this).data("id");
  localStorage.setItem("ViewScreeningID", screeningID);

  window.location.href = `http://localhost:3000/booking/createBooking.html?screeningID=${screeningID}`;
});

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
