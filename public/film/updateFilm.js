$("document").ready(function () {
	nav();
	footer();

	var filmID = localStorage.getItem("FilmID");

	$("#fbody").append(`
		<label class="form-label" for="name">Name</label>
		<input class="form-control" type="text" id="name" name="name" required>

		<label class="form-label" for="category">Category</label>
		<input class="form-control" type="text" id="category" name="category" required>

		<label class="form-label" for="runningTime">Running Time in Minutes</label>
		<input class="form-control" type="number" id="runningTime" name="runningTime" required>
		

		<label class="form-label" for="genre">Age Rating</label>
		<input class="form-control" type="text" id="genre" name="genre" required>

		<label class="form-label" for="director">Director</label>
		<input class="form-control" type="text" id="director" name="director" required>

		<label class="form-label" for="coverImage">Upload Cover Image</label>
		<input class="form-control" type="file" id="coverImage" name="coverImage">

		<label class="form-label" for="videoURL">Video URL</label>
		<input class="form-control" type="text" id="videoURL" name="videoURL" required>

		<label class="form-label" for="ReleaseDate">Release Date</label>
		<input class="form-control" type="date" id="ReleaseDate" name="ReleaseDate" required>

		<br>
	`);

	getJsonData(filmID);

	$("#cancel").click(function () {
		location.replace("http://localhost:3000/film/film.html");
	});

	$("#update").click(function () {
		let updatedFilm = {
			name: $("#name").val(),
			category: $("#category").val(),
			runningTime: $("#runningTime").val(),
			genre: $("#genre").val(),
			director: $("#director").val(),
			coverImage: $("#coverImage").val(),
			videoURL: $("#videoURL").val(),
			ReleaseDate: $("#ReleaseDate").val()
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
		$("#category").val(data.Category);
		$("#runningTime").val(data.RunningTime),
		$("#genre").val(data.Genre);
		$("#director").val(data.Director);
		$("#coverImage").val(data.CoverImage);
		$("#videoURL").val(data.VideoURL);
		$("#ReleaseDate").val(formattedDate);
	}).fail(function () {
		alert("Error fetching film details.");
		location.replace("http://localhost:3000/film/film.html");
	});
}