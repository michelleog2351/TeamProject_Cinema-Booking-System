$(document).ready(function () {
    $("#fbody").append(`
        <label class="form-label" for="name">Name</label>
        <input class="form-control" type="text" id="name" name="name" required>

        <label class="form-label" for="runningTime">Running Time in Minutes</label>
        <input class="form-control" type="text" id="runningTime" name="runningTime" required>

        <label class="form-label" for="category">Category</label>
        <input class="form-control" type="text" id="category" name="category" required>

        <label class="form-label" for="genre">Age Rating</label>
        <input class="form-control" type="text" id="genre" name="genre" required>

        <label class="form-label" for="director">Director</label>
        <input class="form-control" type="text" id="director" name="director" required>

        <label class="form-label" for="coverImage">Cover Image URL</label>
        <input class="form-control" type="text" id="coverImage" name="coverImage" required>

        <label class="form-label" for="videoURL">Video URL</label>
        <input class="form-control" type="text" id="videoURL" name="videoURL" required>

        <label class="form-label" for="ReleaseDate">Release Date</label>
        <input class="form-control" type="date" id="ReleaseDate" name="ReleaseDate" required>
        <br>
    `);
    $("#cancel").click(function () {
        location.replace("http://localhost:3000/film.html");
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
            ReleaseDate: $("#ReleaseDate").val()
        };
        $.post(`http://localhost:3000/createFilm`, newFilm)
            .done(function () {
                alert("Film created successfully!");
                location.replace("http://localhost:3000/film.html");
            })
            .fail(function () {
                alert("Error creating film.");
            });
    });
});