$(document).ready(function () {
    getJsonData();
    $(`#add`).append(
        `<button type="button" class="addButton">Add</button>`
    );

    $(".addButton").click(function () {
        location.replace("http://localhost:3000/createFilm.html");
    });
});


function getJsonData() {
    $.getJSON(`http://localhost:3000/films`, function (data) {
        $.each(data, function (i, value) {
            $(`#tbody`).append(
                `<tr>
                <td id="name${value.Name}" >${value.Name}</td>
                <td id="category${value.Category}">${value.Category}</td>
                <td id="genre${value.Genre}">${value.Genre}</td>
                <td id="director${value.Director}">${value.Director}</td>
                <td><img src="${value.CoverImage}" alt="Cover" width="50"></td>
                <td><a href="${value.VideoURL}" target="_blank">Watch</a></td>
                <td><button type="button" class="updateButton" value="${value.FilmID}">Update</button></td>
                <td><button type="button" class="deleteButton" value="${value.FilmID}">Delete</button></td>
                </tr>`
            );
        });

        $(".updateButton").click(function (e) {
            let ID = e.target.value;
            localStorage.setItem("FilmID", ID);
            location.replace("http://localhost:3000/updateFilm.html");
        });


        $(".deleteButton").click(function (e) {
            let ID = e.target.value;
            $.post(`http://localhost:3000/deleteFilm/${ID}`, { FilmID: ID })
                .done(function () {
                    location.replace("http://localhost:3000/films.html");
                });
        });
    });
}