$(document).ready(function () {
  nav();
  footer();

  $("#fbody").append(`
		<label class="form-label" for="name">Name</label>
		<input class="form-control" type="text" id="name" name="name" required>

		<label class="form-label" for="runningTime">Running Time in Minutes</label>
		<input class="form-control" type="number" id="runningTime" name="runningTime" required>

		<label class="form-label" for="category">Category</label>
		<input class="form-control" type="text" id="category" name="category" placeholder="e.g. Action" required>

    <div class="mb-3">
        <label class="form-label" for="genre">Age Rating</label>
        <select class="form-select" id="genre" name="genre">
        </select>
    </div>

		<label class="form-label" for="director">Director</label>
		<input class="form-control" type="text" id="director" name="director" required>

		<label class="form-label" for="coverImage">Upload Cover Image</label>
		<input class="form-control" type="file" id="coverImage" name="coverImage">

		<label class="form-label" for="videoURL">Video URL</label>
		<input class="form-control" type="text" id="videoURL" name="videoURL" placeholder="e.g. https://example.com/dark_knight" required>

		<label class="form-label" for="ReleaseDate">Release Date</label>
		<input class="form-control" type="date" id="ReleaseDate" name="ReleaseDate" required>
		<br>
	`);
  $("#cancel").click(function () {
    location.replace("http://localhost:3000/film/film.html");
  });

  $("#save").click(function () {
    let newFilm = {
      name: $("#name").val(),
      category: $("#category").val(),
      runningTime: $("#runningTime").val(),
      genre: $("#genre").val(),
      director: $("#director").val(),
      coverImage: $("#coverImage").val(),
      videoURL: $("#videoURL").val(),
      ReleaseDate: $("#ReleaseDate").val(),
    };
    $.post(`http://localhost:3000/createFilm`, newFilm)
      .done(function () {
        alert("Film created successfully!");
        location.replace("http://localhost:3000/film/film.html");
      })
      .fail(function () {
        alert("Error creating film.");
      });
  });
  getAgeRatingData();
});

function getAgeRatingData() {
  //Retrive the data from the film
  $.getJSON(`http://localhost:3000/ageRatings`, function (data) {
      $.each(data, function (i, value) {
          // IF Else to check film and select the one that is currently part of the screening
          $(`#genre`).append(`<option value="${value.AgeRating}">${value.AgeRating}</option>`);
      });
  });
}