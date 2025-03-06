$(document).ready(function () {
  nav();
  footer();
  loadFilmDetails();
});

function loadFilmDetails() {
  // const filmID = localStorage.getItem("FilmID");
  const urlParams = new URLSearchParams(window.location.search);
  const filmID = urlParams.get("filmID"); // Get the FilmID from the URL

  console.log("Retrieved FilmID:", filmID);
  if (!filmID) {
    alert("No film selected.");
    location.href = "cFilms.html";
    return;
  }

{/* <img src="${
                  value.CoverImage
                }" class="card-img-top img-fluid" alt="${value.Name}" style="height: 400px; object-fit: cover;"></img> */}

                $.getJSON(`http://localhost:3000/film/${filmID}`, function (value) {
                  let releaseDate = new Date(value.ReleaseDate).toISOString().split("T")[0];
                  $("#filmDetails").html(`
                    <div class="card" style="position: relative;">
                      <div class="card-body" style="height: 700px;background-color: rgba(0, 0, 0, 0.3); position: relative; z-index: 2;">
                        <h2 class="card-title">${value.Name}</h2>
                        <p class="card-text"><strong>Category:</strong> ${value.Category}</p>
                        <p class="card-text"><strong>Run-Time:</strong> ${value.RunningTime} mins</p>
                        <p class="card-text"><strong>Age Rating:</strong> ${value.Genre}</p>
                        <p class="card-text"><strong>Director:</strong> ${value.Director}</p>
                        <p class="card-text"><strong>Release Date:</strong> ${releaseDate}</p>
                        <button type="button" class="btn btn-primary" onclick="playTrailer('${value.VideoURL}')">Watch Trailer</button>
                        <button type="button" class="btn btn-secondary" onclick="location.href='cFilm.html'">Go Back</button>
                      </div>
                      <div id="screeningDetails" class="card-body" style="background-color: rgba(0, 0, 0, 0.3); z-index: 2;">
                        <h6>Showings</h6>
                      </div>
                      <img src="http://localhost:3000/images/${value.Name.replace(/\s+/g, "_")}.jpg" 
                           class="card-img-top img-fluid" alt="${value.Name}" 
                           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 1;">
                    </div>
                  `);
    fetchScreenings(filmID);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("Failed to load film details:", textStatus, errorThrown);
    alert("Failed to load film details.");
    location.href = "cFilm.html";
  });
}

function fetchScreenings(filmID) {
  $.getJSON(`http://localhost:3000/filmScreenings/${filmID}`, function (data) {
    $.each(data, function (i, value) {
      let screeningDate = new Date(value.Date);
      let formattedDate = screeningDate.toISOString().split("T")[0];
      $(`#screeningDetails`).append(
        `
                    <p class="card-text">Date: ${formattedDate}  Time: ${value.StartTime} Theatre: ${value.TheatreID} Seats Left: ${value.SeatsRemaining} </p>
                `
      );
    });
  });
}
function playTrailer(videoURL) {
  console.log("Video URL: " + videoURL); // Debug

  $('#trailerModal').on('shown.bs.modal', function () {
    $('#trailerVideo').attr('src', videoURL); 
  }); 
  $('#trailerModal').modal('show');
}


$('#trailerModal').on('hidden.bs.modal', function () {
  console.log('Modal closed');
  $('#trailerVideo').attr('src', '');
  $('#trailerModal').attr('inert', 'true');
});
