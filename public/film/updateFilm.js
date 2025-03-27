$("document").ready(function () {
	nav();
	footer();

	var filmID = localStorage.getItem("FilmID"); // Retrieve FilmID from local storage to identify film being updated

	// Dynamically update form
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
				<small id="CategoryWarningMessage" style="color: red; display: none;">Please enter the category</small
			</div>

			<div class="mb-3">
				<label class="form-label" for="genre">Age Rating</label>
				<select class="form-select" id="genre" name="genre" required>
				</select>
				<small id="AgeWarningMessage" style="color: red; display: none;">Please enter the age rating</small
			</div>

		<div class="mb-3">
			<label class="form-label" for="director">Director</label>
			<input class="form-control" type="text" id="director" name="director" required>
			<small id="directorWarningMessage" style="color: red; display: none;">Please enter the name of the film director</small>
		</div>

		<div class="mb-3">
			<label class="form-label" for="Description">Description</label>
			<textarea class="form-control" type="text" id="Description" name="Description" required></textarea>
    		<small id="DescriptionWarningMessage" style="color: red; display: none;">Please enter the Description</small>
    	</div>

		<div class="mb-3">
			<label class="form-label" for="coverImage">Upload Cover Image</label>
			<input class="form-control" type="file" id="coverImage" name="coverImage">
			<small id="imageWarningMessage" style="color: red; display: none;">Please enter an image</small
		</div>

		<div class="mb-3">
			<label class="form-label" for="videoURL">Video URL</label>
			<input class="form-control" type="text" id="videoURL" name="videoURL" required>
			<small id="videoURLWarningMessage" style="color: red; display: none;">Please enter the trailer URL</small>
		</div>

		<div class="mb-3">
			<label class="form-label" for="ReleaseDate">Release Date</label>
			<input class="form-control" type="date" id="ReleaseDate" name="ReleaseDate" required>
			<small id="dateWarningMessage" style="color: red; display: none;">Please enter the release date of the film</small>
		</div>

		<br>
	`);

	getJsonData(filmID);

	$("#cancel").click(function () {
		location.replace("http://localhost:3000/film/film.html");
	});

	$("#update").click(function () {
        let isValid = true;
        $("small").hide();

        if ($("#name").val().trim() === '') {
            $("#nameWarningMessage").show();
            isValid = false;
        }
        if ($("#runningTime").val() === '') {
            $("#runningTimeWarningMessage").show();
            isValid = false;
        }
        if ($("#category").val() === '') {
            $("#categoryWarningMessage").show();
            isValid = false;
        }
        if ($("#genre").val() === '') {
            $("#genreWarningMessage").show();
            isValid = false;
        }
        if ($("#director").val().trim() === '') {
            $("#directorWarningMessage").show();
            isValid = false;
        }
        if ($("#coverImage")[0].files.length === 0) {
            $("#coverImageWarningMessage").show();
            isValid = false;
        }
        if ($("#videoURL").val().trim() === '') {
            $("#videoURLWarningMessage").show();
            isValid = false;
        }
        if ($("#ReleaseDate").val() === '') {
            $("#releaseDateWarningMessage").show();
            isValid = false;
        }
		if ($("#Description").val() === '') {
			$("#DescriptionWarningMessage").show();
			inputValidation = false;
		  }

        if (!isValid) {
            return;
        }

        let coverImage = $("#coverImage")[0].files[0];

        let updatedFilm = {
            name: $("#name").val(),
            category: $("#category").val(),
            runningTime: $("#runningTime").val(),
            genre: $("#genre").val(),
            director: $("#director").val(),
            coverImage: coverImage ? coverImage.name : $("#currentCoverImage").text(),
            videoURL: $("#videoURL").val(),
            ReleaseDate: $("#ReleaseDate").val(),
			Description: $("#Description").val()
        };

        $.post(`http://localhost:3000/updateFilm/${filmID}`, updatedFilm)
            .done(function () {
                alert("Film updated");
                location.replace("http://localhost:3000/film/film.html");
            })
            .fail(function () {
                alert("Error updating film.");
            });
    });
});

function getJsonData(filmID) {
	$.getJSON(`http://localhost:3000/film/${filmID}`, function (data) {

		let releaseDate = new Date(data.ReleaseDate);
		let formattedDate = releaseDate.toISOString().split('T')[0];

		$("#name").val(data.Name);
		$("#director").val(data.Director);
		$("#coverImage").val('');
		$("#fileInfo").remove();
		$("#coverImage").after(`<p id="currentCoverImage">${data.CoverImage}</p>`);
		$("#videoURL").val(data.VideoURL);
		$("#ReleaseDate").val(formattedDate);
		$("#Description").val(data.Description);

		getAgeRatingData(data.Genre);
		getFilmCategories(data.Category);
		getRunningMinutes(data.RunningTime);


	}).fail(function () {
		alert("Error fetching film details.");
		location.replace("http://localhost:3000/film/film.html");
	});
}

function getAgeRatingData(Genre) {
	//Retrive the data from the film
	$.getJSON(`http://localhost:3000/ageRatings`, function (data) {
		$.each(data, function (i, value) {
			// IF Else to check film and select the one that is currently part of the screening
			let isSelected = (value.AgeRating === Genre) ? 'selected' : '';
			$(`#genre`).append(`<option value="${value.AgeRating}" ${isSelected}>${value.AgeRating}</option>`);
		});
	});
}

function getRunningMinutes(RunningTime) {
	//Retrive the data from the film
	$.getJSON(`http://localhost:3000/runningMinutes`, function (data) {
		$.each(data, function (i, value) {
			// IF Else to check film and select the one that is currently part of the screening
			let isSelected = (value.RunningTime === RunningTime) ? 'selected' : '';
			$(`#runningTime`).append(`<option value="${value.RunningTime}" ${isSelected}>${value.RunningTime}</option>`);
		});
	});
}

function getFilmCategories(Category) {
	//Retrive the data from the film
	$.getJSON(`http://localhost:3000/category`, function (data) {
		$.each(data, function (i, value) {
			// IF Else to check film and select the one that is currently part of the screening
			let isSelected = (value.Category === Category) ? 'selected' : '';
			$(`#category`).append(`<option value="${value.Category}" ${isSelected}>${value.Category}</option>`);
		});
	});
}