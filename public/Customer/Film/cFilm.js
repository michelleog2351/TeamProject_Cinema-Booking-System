$(document).ready(function () {
  nav();
  footer();
  // if (typeof nav === "function") nav();
  // if (typeof footer === "function") footer();

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
    const filteredFilms = data.filter((film) => {
      var filmName = film.Name.toLowerCase();
      var filmCategory = film.Category.toLowerCase();

      // Search for name and genre match
      return (
        filmName.includes(searchInput) ||
        filmCategory.includes(searchInput) ||
        searchInput === ""
      );
    });

    if (searchInput === "") {
      $("#noFilmsAlert").hide();
    } else if (filteredFilms.length === 0) {
      $("#noFilmsAlert")
        .text(`No film results found for '${searchInput}'. Please try again.`)
        .show();
    } else {
      $("#noFilmsAlert")
        .text(`Showing ${filteredFilms.length} result(s) for '${searchInput}'`)
        .show();

      if (filteredFilms.length > 0) {
        $.each(filteredFilms, function (i, value) {
          let releaseDate = new Date(value.ReleaseDate)
            .toISOString()
            .split("T")[0];
          const imagePath = `http://localhost:3000/images/${value.Name.replace(
            /\s+/g,
            "_"
          )}.jpg`;
          console.log(imagePath);

          $("#filmCards").append(
            `<div class="col-md-4 mb-3">
					 <div class="card">
						 <img src="http://localhost:3000/images/${value.Name.replace(/\s+/g, "_")}.jpg" 
     class="card-img-top img-fluid" 
     alt="${value.Name}" 
     style="height: 200px; object-fit: cover;">
						 <div class="card-body">
							 <h5 class="card-title">${value.Name}</h5>
							 <p class="card-text">${value.Category} | ${value.Genre}</p>
							 <p class="card-text"><small>Released: ${releaseDate}</small></p>
							 <button type="button" class="btn btn-primary viewDetailsButton" data-id="${
                 value.FilmID
               }">
								 View Details
							 </button>
						 </div>
					 </div>
				 </div>`
          );
        });
      }
    }

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

  // Focus on the search input field after clearing
  $("#searchInput").focus();
}

function fetchFilms() {
  $("#filmCards").empty();
  $.getJSON(`http://localhost:3000/films`, function (data) {
    $.each(data, function (i, value) {
      let releaseDate = new Date(value.ReleaseDate).toISOString().split("T")[0];
      $("#filmCards").append(`
				<div class="col-md-4 mb-3">
					<div class="card">
      <img src="/images/${value.Name.replace(/\s+/g, "_")}.jpg" 
          class="card-img-top img-fluid" 
          alt="${value.Name}" 
          style="height: 200px; object-fit: cover;">						
     <div class="card-body">
							<h5 class="card-title">${value.Name}</h5>
							<p class="card-text">${value.Category} | ${value.Genre}</p>
							<p class="card-text"><small>Released: ${releaseDate}</small></p>
							<button type="button" class="btn btn-primary viewDetailsButton" data-id="${
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
