$(document).ready(function () {
  nav();
  footer();
  getJsonData();

  $("#add").append(
    `<button type="button" class="addButton btn btn-primary">Create Screening</button>`
  );

  $(".addButton").click(function () {
    location.replace("http://localhost:3000/screening/createScreening.html");
  });
});

async function getJsonData() {
  await $.getJSON(`http://localhost:3000/screenings`, function (data) {
    $.each(data, async function (i, value) {
      let screeningDate = new Date(value.Date);
      let formattedDate = screeningDate.toISOString().split("T")[0];
      let filmname = await getFilmData(value.FilmID);

      $(`#tbody`).append(
        `<tr>
								<td id="startTime${value.StartTime}">${value.StartTime}</td>
								<td id="date${formattedDate}">${formattedDate}</td>
								<td id="seatsRemaining${value.SeatsRemaining}">${value.SeatsRemaining}</td>
								<td id="theatreID${value.TheatreID}">${value.TheatreID}</td>
								<td id="filmID${filmname}">${filmname}</td>
								<td><button type="button" class="updateButton btn btn-secondary" value="${value.ScreeningID}">Update</button></td>
								<td><button type="button" class="deleteButton btn btn-danger" value="${value.ScreeningID}">Delete</button></td>
								</tr>`
      );
    });

    $(document).on("click", ".updateButton", function (e) {
      let ID = e.target.value;
      localStorage.setItem("ScreeningID", ID);
      location.replace("http://localhost:3000/screening/updateScreening.html");
    });

    $(document).on("click", ".deleteButton", function (e) {
      let ID = e.target.value;
      $.post(`http://localhost:3000/deleteScreening/${ID}`).done(function () {
        location.replace("http://localhost:3000/screening/screening.html");
      });
    });
  });
}

async function getFilmData(ID) {
  let data = await $.getJSON(`http://localhost:3000/film/${ID}`);
  return data.Name;
}

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
