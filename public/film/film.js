$(document).ready(function () {
  nav();
  footer();
  getJsonData();
  $("#add").append(
    `<button type="button" class="addButton btn btn-primary">Add</button>`
  );

  $(".addButton").click(function () {
    location.replace("http://localhost:3000/film/createFilm.html");
  });
});

$(document).ready(function () {
  $("#sortButton").click(sortFilmNames);
});

$(document).ready(function () {
  var scrollTopBtn = $(".scroll-to-top-btn");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      scrollTopBtn.fadeIn().css("visibility", "visible");
    } else {
      scrollTopBtn.fadeOut().css("visibility", "hidden");
    }
  });

  scrollTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 120);
  });
});

function getJsonData() {
  $.getJSON(`http://localhost:3000/films`, function (data) {
    data.sort((a, b) => a.Name.localeCompare(b.Name));

    $.each(data, function (i, value) {
      let releaseDate = new Date(value.ReleaseDate);
      let formattedDate = releaseDate.toISOString().split("T")[0];
      // <td><img src="${value.CoverImage}" alt="Cover" width="50"></td>
      $(`#tbody`).append(
        `<tr>
								<td id="name${value.Name}" >${value.Name}</td>
								<td id="category${value.Category}">${value.Category}</td>
								<td id="runningTime${value.RunningTime}">${value.RunningTime}</td>
								<td id="genre${value.Genre}">${value.Genre}</td>
								<td id="director${value.Director}">${value.Director}</td>
								<td><img src="../../images/${value.Name.replace(
                  /\s+/g,
                  "_"
                )}.jpg" alt="Cover" width="50"></td>
								<td><a href="${value.VideoURL}" target="_blank">Watch</a></td>
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

let sortOrder = "name_asc"; // Default sort order

function sortFilmNames() {
  $.getJSON(`http://localhost:3000/films`, function (data) {
    sortOrder = sortOrder === "name_asc" ? "name_desc" : "name_asc";

    // Sorting functionality - sort from A-Z or Z-A
    if (sortOrder === "name_asc") {
      data.sort((a, b) => a.Name.localeCompare(b.Name));
    } else {
      data.sort((a, b) => b.Name.localeCompare(a.Name));
    }

    let tbody = $("#tbody");
    tbody.empty();

    $.each(data, function (i, film) {
      tbody.append(`
								<tr>
										<td>${film.Name}</td>
										<td>${film.Category}</td>
										<td>${film.RunningTime}</td>
										<td>${film.Genre}</td>
										<td>${film.Director}</td>
										 <td><img src="../../images/${film.Name.replace(
                       /\s+/g,
                       "_"
                     )}.jpg" alt="Cover" width="50"></td>
                    <td><a href="${
                      film.VideoURL
                    }" target="_blank">Watch</a></td>
                    <td>${
                      new Date(film.ReleaseDate).toISOString().split("T")[0]
                    }</td>
										 <td><button type="button" class="updateButton btn btn-secondary" value="${
                       film.FilmID
                     }">Update</button></td>
								<td><button type="button" class="deleteButton btn btn-danger" value="${
                  film.FilmID
                }">Delete</button></td>
								</tr>
						`);
    });
    updateSortButton();
  });
}

function updateSortButton() {
  let sortButton = $("#sortButton img");
  if (sortOrder === "name_asc") {
    sortButton.attr("src", "../images/sort-alpha-up-alt.svg");
    sortButton.attr("title", "Sort films from Z-A");
  } else {
    sortButton.attr("src", "../images/sort-alpha-down.svg");
    sortButton.attr("title", "Sort films from A-Z");
  }
}
