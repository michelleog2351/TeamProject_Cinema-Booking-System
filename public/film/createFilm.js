$(document).ready(function () {
  nav();
  footer();

  $("#fbody").append(`
    <div class="mb-3">
		<label class="form-label" for="name">Name</label>
		<input class="form-control" type="text" id="name" name="name" required>
    </div>

    <div class="mb-3">
        <label class="form-label" for="runningTime">Running Time in Minutes</label>
        <select class="form-select" id="runningTime" name="runningTime">
        </select>
    </div>

    <div class="mb-3">
        <label class="form-label" for="category">Category</label>
        <select class="form-select" id="category" name="category">
        </select>
    </div>

    <div class="mb-3">
        <label class="form-label" for="genre">Age Rating</label>
        <select class="form-select" id="genre" name="genre">
        </select>
    </div>

    <div class="mb-3">
		<label class="form-label" for="director">Director</label>
		<input class="form-control" type="text" id="director" name="director" required>
    </div>

    <div class="mb-3">
		<label class="form-label" for="coverImage">Upload Cover Image</label>
		<input class="form-control" type="file" id="coverImage" name="coverImage">
    </div>

    <div class="mb-3">
		<label class="form-label" for="videoURL">Video URL</label>
		<input class="form-control" type="text" id="videoURL" name="videoURL" placeholder="e.g. https://example.com/dark_knight" required>
    </div>

    <div class="mb-3">
		<label class="form-label" for="ReleaseDate">Release Date</label>
		<input class="form-control" type="date" id="ReleaseDate" name="ReleaseDate" required>
    </div>
		<br>
	`);
  $("#cancel").click(function () {
    location.replace("http://localhost:3000/film/film.html");
  });

  $("#save").click(function () {

    if ($("#name").val() == '' || $("#director").val() == '' || $(`#ReleaseDate`).val() == '' || $(`#videoURL`).val() == '') {
      alert("All fields must be entered before a Sceening can be created");
      return;
    }

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
  getRunningMinutes();
  getFilmCategories();
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

function getRunningMinutes() {
  //Retrive the data from the film
  $.getJSON(`http://localhost:3000/runningMinutes`, function (data) {
      $.each(data, function (i, value) {
          // IF Else to check film and select the one that is currently part of the screening
          $(`#runningTime`).append(`<option value="${value.RunningTime}">${value.RunningTime}</option>`);
      });
  });
}

function getFilmCategories() {
  //Retrive the data from the film
  $.getJSON(`http://localhost:3000/category`, function (data) {
      $.each(data, function (i, value) {
          // IF Else to check film and select the one that is currently part of the screening
          $(`#category`).append(`<option value="${value.Category}">${value.Category}</option>`);
      });
  });
}
