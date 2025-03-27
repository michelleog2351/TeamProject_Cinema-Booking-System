$(document).ready(function () {
  nav();
  footer();
  loadFilmDetails();
  
});

function loadFilmDetails() {
  // const filmID = localStorage.getItem("FilmID");
  const urlParams = new URLSearchParams(window.location.search);
  const filmID = urlParams.get("filmID"); // Get the FilmID from the URL

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
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-4">
        <img src="http://localhost:3000/images/${value.Name.replace(/\s+/g, "_")}.jpg" 
             class="img-fluid rounded shadow" 
             alt="${value.Name}">
             <div class="mb-3">
             <br>
             <button type="button" class="btn btn-primary" onclick="playTrailer('${value.VideoURL}')">
                Watch Trailer
              </button>
              <button type="button" class="btn btn-secondary" onclick="location.href='cFilm.html'">
                  Go Back
              </button>
              </div>
      </div>

        <div class="col-md-8">
          <h2 class="fw-bold">${value.Name}</h2>
          <p><strong>Directed by:</strong> ${value.Director}</p>
          <p><strong>Description:</strong><br> ${value.Description}</p>
          <p><strong>Genre:</strong> ${value.Category}</p>
          <p><strong>Run Time:</strong> ${value.RunningTime} mins</p>
          <p><strong>Release Date:</strong> ${releaseDate}</p>
          <p><strong>Rating:</strong> ${value.Genre}</p>
          <div class="col-12">
          <h4 class="fw-bold">Screenings</h4>
          <div id="screeningDetails">
          <table class="table table-hover">
          <thead>
            <tr>
              <th>Date</th>  
              <th>Start Time</th>
              <th>Seats Available</th>
              <th>Theatre</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
          
          
          </div>
        </div>
      </div>
    </div>
  </div>
  `
);

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
      $(`#tbody`).append(`
        <tr>
          <td id="startTime${value.StartTime}">${value.StartTime}</td>
          <td id="date${formattedDate}">${formattedDate}</td>
          <td id="seatsRemaining${value.SeatsRemaining}">${value.SeatsRemaining}</td>
          <td id="theatreID${value.TheatreID}">${value.TheatreID}</td>
          <td><button type="button" class="bookingButton btn btn-primary" value="${value.ScreeningID}">Book</button></td>
          </tr>`
      );
      $(".bookingButton").click(function(e){
        console.log(e.target.value);;
        let ID = e.target.value;
      
        localStorage.setItem("ViewScreeningID", ID);
        location.replace("http://localhost:3000/booking/createBooking.html");
      
      
        });
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

