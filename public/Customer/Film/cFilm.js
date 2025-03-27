$(document).ready(function () {
  nav();
  footer();
  fetchFilms();

  $("#searchInput").on("input", function () {
    search();
  });
});
/*
 * IMAGES
 * <img src="../../images/${value.Name.replace(/\s+/g, "_")}.jpg"
 * can put this line anywhere it has value.CoverImage
 * to view the images, which are stored in the images folder
 *
 */

function search() {
  var searchInput = $("#searchInput").val().toLowerCase();
  $("#filmCards").empty();

  $.getJSON("http://localhost:3000/films", function (data) {
    let filteredFilms = data;

    if (searchInput !== "") {
      filteredFilms = data.filter((film) => {
        var filmName = film.Name.toLowerCase();
        var filmCategory = film.Category.toLowerCase();

        return (
          filmName.includes(searchInput) || filmCategory.includes(searchInput)
        );
      });

      if (filteredFilms.length > 0) {
        $("#noFilmsAlert")
          .text(
            `Showing ${filteredFilms.length} result(s) for '${searchInput}'`
          )
          .show();
      } else {
        $("#noFilmsAlert")
          .text(
            `Sorry, no film results were found for '${searchInput}'. Please try again.`
          )
          .show();
      }
    } else {
      $("#noFilmsAlert").hide(); // Hide alert when input is cleared
    }

    // Repopulate the film cards
    $.each(filteredFilms, function (i, value) {
      let releaseDate = new Date(value.ReleaseDate).toISOString().split("T")[0];

      $("#filmCards").append(`
        <div class="col-md-3 mb-3">
          <div class="card" style="background-color: rgba(0, 0, 0, 0.7);">
            <img src="/images/${value.Name.replace(/\s+/g, "_")}.jpg" 
                class="card-img-top img-fluid" 
                alt="${value.Name}" 
                style="height: 500px; object-fit: contain; margin:0;">						
            <div class="card-body" style="height:auto; background-color: rgba(255,255,255); border-radius: 5px;">
              <h5 class="card-title">${value.Name}</h5>
              <p class="card-text">${value.Category} | ${value.Genre}</p>
              <p class="card-text"><small>Released: ${releaseDate}</small></p>
              <button type="button" class="btn btn-primary viewDetailsButton" style="width: 100%;" data-id="${
                value.FilmID
              }">
                View Details
              </button>
            </div>
          </div>
        </div>`);
    });

    $(document).on("click", ".viewDetailsButton", function () {
      let filmID = $(this).data("id");
      console.log("Selected Film ID:", filmID);
      localStorage.setItem("FilmID", filmID);
      location.href = `filmDetails.html?filmID=${filmID}`;
    });
  }).fail(function () {
    alert("Failed to load films.");
  });
}

function clearFilter() {
  // Clear the search input and genre filter
  $("#searchInput").val("");

  $("#filmCards .alert").remove();

  // Reset
  fetchFilms(); // This will fetch and display all films again

  $("#searchInput").focus();
}

function fetchFilms() {
  $("#filmCards").empty();
  $.getJSON(`http://localhost:3000/films`, function (data) {
    $.each(data, function (i, value) {
      let releaseDate = new Date(value.ReleaseDate).toISOString().split("T")[0];
      $("#filmCards").append(`
				<div class="col-md-3 mb-3">
					<div class="card" style="background-color: rgba(0, 0, 0, 0.7);">
      <img src="/images/${value.Name.replace(/\s+/g, "_")}.jpg" 
          class="card-img-top img-fluid" 
          alt="${value.Name}" 
          style="height: 500px; object-fit: contain; margin:0;">						
     <div class="card-body" style="height:auto; background-color: rgba(255,255,255); border-radius: 5px;">
							<h5 class="card-title">${value.Name}</h5>
							<p class="card-text">${value.Category} | ${value.Genre}</p>
							<p class="card-text"><small>Released: ${releaseDate}</small></p>
							<button type="button" class="btn btn-primary viewDetailsButton" style="width: 100%;" data-id="${
                value.FilmID
              }">
								View Details
							</button>
						</div>
					</div>
				</div>
			`);
    });

    $(document).on("click", ".viewDetailsButton", function () {
      let filmID = $(this).data("id");
      console.log("Selected Film ID:", filmID);
      localStorage.setItem("FilmID", filmID); // Updated to store the selected FilmID
      location.href = `filmDetails.html?filmID=${filmID}`;
    });
  }).fail(function () {
    alert("Failed to load films.");
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
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
