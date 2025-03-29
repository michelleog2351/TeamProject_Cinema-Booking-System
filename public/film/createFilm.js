$(document).ready(function () {
  nav();
  footer();

  $("#fbody").append(`
    <div class="mb-3">
		<label class="form-label" for="name">Name</label>
		<input class="form-control" type="text" id="name" name="name" required>
    <small id="nameWarningMessage" style="color: red; display: none;">Please enter the name of a film</small>
    </div>

    <div class="mb-3">
        <label class="form-label" for="runningTime">Running Time in Minutes</label>
        <select class="form-select" id="runningTime" name="runningTime" required>
        </select>
        <small id="runningTimeWarningMessage" style="color: red; display: none;">Please enter the running time</small>
    </div>

    <div class="mb-3">
        <label class="form-label" for="category">Category</label>
        <select class="form-select" id="category" name="category" required>
        </select>
        <small id="CategoryWarningMessage" style="color: red; display: none;">Please enter the category</small>
    </div>

    <div class="mb-3">
        <label class="form-label" for="genre">Age Rating</label>
        <select class="form-select" id="genre" name="genre" required>
        </select>
        <small id="AgeWarningMessage" style="color: red; display: none;">Please enter the age rating</small>
    </div>

    <div class="mb-3">
		<label class="form-label" for="director">Director</label>
		<input class="form-control" type="text" id="director" name="director" required>
    <small id="directorWarningMessage" style="color: red; display: none;">Please enter the name of the film director</small>
    </div>

    <div class="mb-3">
		<label class="form-label" for="Starring">Starring</label>
		<input class="form-control" type="text" id="Starring" name="Starring" required>
    <small id="StarringWarningMessage" style="color: red; display: none;">Please enter the stars</small>
    </div>

    <div class="mb-3">
		<label class="form-label" for="Description">Description</label>
		<input class="form-control" type="text" id="Description" name="Description" required>
    <small id="DescriptionWarningMessage" style="color: red; display: none;">Please enter the description</small>
    </div>

    <div class="mb-3">
		<label class="form-label" for="coverImage">Upload Cover Image</label>
		<input class="form-control" type="file" id="coverImage" name="coverImage" required>
    <small id="imageWarningMessage" style="color: red; display: none;">Please enter an image</small>
    </div>

    <div class="mb-3">
		<label class="form-label" for="videoURL">Video URL</label>
		<input class="form-control" type="text" id="videoURL" name="videoURL" placeholder="e.g. https://example.com/dark_knight" required>
    <small id="videoURLWarningMessage" style="color: red; display: none;">Please enter the trailer URL</small>
    </div>

    <div class="mb-3">
		<label class="form-label" for="ReleaseDate">Release Date</label>
		<input class="form-control" type="date" id="ReleaseDate" name="ReleaseDate" required>
    <small id="dateWarningMessage" style="color: red; display: none;">Please enter the release date of the film</small>
    </div>
		<br>
	`);
  $("#cancel").click(function () {
    location.replace("http://localhost:3000/film/film.html");
  });

  $("#save").click(function () {
    var inputValidation = true;
    $("small").hide();
  
    if ($("#name").val() === '') {
      $("#nameWarningMessage").show();
      inputValidation = false;
    }
    if ($("#runningTime").val() === '') {
      $("#runningTimeWarningMessage").show();
      inputValidation = false;
    }
    if ($("#category").val() === '') {
      $("#categoryWarningMessage").show();
      inputValidation = false;
    }
    if ($("#genre").val() === '') {
      $("#ageWarningMessage").show();
      inputValidation = false;
    }
    if ($("#director").val() === '') {
      $("#directorWarningMessage").show();
      inputValidation = false;
    }
    if ($("#coverImage")[0].files.length === 0) {
      $("#imageWarningMessage").show();
      inputValidation = false;
    }
    if ($("#videoURL").val() === '') {
      $("#videoURLWarningMessage").show();
      inputValidation = false;
    }
    if ($("#ReleaseDate").val() === '') {
      $("#dateWarningMessage").show();
      inputValidation = false;
    }
    if ($("#Description").val() === '') {
      $("#DescriptionWarningMessage").show();
      inputValidation = false;
    }
  
    if (!inputValidation) {
      return;
    }
  
    let formData = new FormData();
    formData.append("name", $("#name").val());
    formData.append("category", $("#category").val());
    formData.append("runningTime", $("#runningTime").val());
    formData.append("genre", $("#genre").val());
    formData.append("director", $("#director").val());
    formData.append("coverImage", $("#coverImage")[0].files[0]); // File
    formData.append("videoURL", $("#videoURL").val());
    formData.append("ReleaseDate", $("#ReleaseDate").val());
    formData.append("Description", $("#Description").val());
    formData.append("Starring", $("#Starring").val());
  
    $.ajax({
      url: "http://localhost:3000/createFilm",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        alert("Film created successfully!");
        location.replace("http://localhost:3000/film/film.html");
      },
      error: function () {
        alert("Error creating film.");
      },
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
