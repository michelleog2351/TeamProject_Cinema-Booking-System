$(document).ready(function () {
  nav();
  footer();
  getJsonData();
  $(`#add`).append(
    `<button type="button" class="addButton btn btn-primary">Add</button>`
  );

  $(".addButton").click(function () {
    location.replace("http://localhost:3000/film/createFilm.html");
  });
});

function getJsonData() {
  $.getJSON(`http://localhost:3000/films`, function (data) {
    $.each(data, function (i, value) {
      let releaseDate = new Date(value.ReleaseDate);
      let formattedDate = releaseDate.toISOString().split("T")[0];
      // <td><img src="${value.CoverImage}" alt="Cover" width="50"></td>
      $(`#tbody`).append(
        `<tr>
                <td id="name${value.Name}" >${value.Name}</td>
                <td id="category${value.Category}">${value.Category}</td>
                <td id="runningTime${value.RunningTime}">${
          value.RunningTime
        }</td>
                <td id="genre${value.Genre}">${value.Genre}</td>
                <td id="director${value.Director}">${value.Director}</td>
                <td><img src="../../images/${value.Name.replace(
                  /\s+/g,
                  "_"
                )}.jpg" alt="Cover" width="50"></td>
                <td><a href="${value.VideoURL}" target="_blank">Watch Trailer</a></td>
                <td id="ReleaseDate${formattedDate}">${formattedDate}</td>
                <td><button type="button" class="updateButton btn btn-secondary" value="${
                  value.FilmID
                }">Update</button></td>
                <td><button type="button" class="deleteButton btn btn-danger" value="${
                  value.FilmID
                }">Delete</button></td>
                </tr>`
      );
    });

    $(".updateButton").click(function (e) {
      let ID = e.target.value;
      localStorage.setItem("FilmID", ID);
      location.replace("http://localhost:3000/film/updateFilm.html");
    });

    $(".deleteButton").click(function (e) {
      let ID = e.target.value;
      $.post(`http://localhost:3000/deleteFilm/${ID}`, { FilmID: ID }).done(
        function () {
          location.replace("http://localhost:3000/film/film.html");
        }
      );
    });
  });
}
