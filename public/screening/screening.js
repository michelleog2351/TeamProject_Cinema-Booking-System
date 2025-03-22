$(document).ready(function () {
  nav();
  footer();
  getJsonData();
  theatreDD();

  $("#add").append(
    `<button type="button" class="addButton btn btn-primary">Create Screening</button>`
  );

  $(".addButton").click(function () {
    location.replace("http://localhost:3000/screening/createScreening.html");
  });
});

async function getJsonData() {
  let selectedTheatreID = $("#selectTheatre").val();

  //await $.getJSON(`http://localhost:3000/screenings`, function (data) {

  let data = await $.getJSON(`http://localhost:3000/screenings`);
  $("#tbody").empty();

  let filteredScreenings;
  if (selectedTheatreID) {
    filteredScreenings = data.filter(
      (value) => value.TheatreID == selectedTheatreID
    );
  } else {
    filteredScreenings = data;
  }

  // let screeningDate = new Date(value.Date);
  // let formattedDate = screeningDate.toISOString().split("T")[0];

  // let filmname = await getFilmData(value.FilmID);

  // $(`#tbody`).append(
  //   `<tr>
  let rows = await Promise.all(
    filteredScreenings.map(async (value) => {
      let formattedDate = new Date(value.Date).toISOString().split("T")[0];
      let filmname = await getFilmData(value.FilmID);

      return `<tr>
								<td id="startTime${value.StartTime}">${value.StartTime}</td>
								<td id="date${formattedDate}">${formattedDate}</td>
								<td id="seatsRemaining${value.SeatsRemaining}">${value.SeatsRemaining}</td>
								<td id="theatreID${value.TheatreID}">${value.TheatreID}</td>
								<td id="filmID${filmname}">${filmname}</td>
								<td><button type="button" class="updateButton btn btn-secondary" value="${value.ScreeningID}">Update</button></td>
								<td><button type="button" class="deleteButton btn btn-danger" value="${value.ScreeningID}">Delete</button></td>
								</tr>`;
      //   );
      // });
    })
  );

  // Append all rows at once
  $("#tbody").append(rows.join(""));

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
  // });
}

async function getFilmData(ID) {
  let data = await $.getJSON(`http://localhost:3000/film/${ID}`);
  return data.Name;
}

function theatreDD() {
  $.getJSON("http://localhost:3000/theatres", function (data) {
    data.sort((a, b) => String(a.TheatreID).localeCompare(String(b.TheatreID)));

    let selectTheatre = $("#selectTheatre");
    let screeningsTbody = $("#tbody");

    selectTheatre.html('<option value="" selected>All Theatres</option>');
    screeningsTbody.empty(); // Clear any previous screenings

    $.each(data, function (i, theatre) {
      selectTheatre.append(
        `<option value="${theatre.TheatreID}">${theatre.TheatreID}</option>`
      );
    });
  });

  $("#selectTheatre").change(async function () {
    console.log("Dropdown changed:", $(this).val());

    let theatreID = $(this).val();
    let screeningsTbody = $("#tbody");

    screeningsTbody.empty(); // clear
    $("#noScreeningsAlert").hide(); // hide

    let data = await $.getJSON("http://localhost:3000/screenings");
    let filteredScreenings = theatreID
      ? data.filter((screening) => screening.TheatreID == theatreID)
      : data;
    if (filteredScreenings.length === 0) {
      screeningsTbody.empty();

      // If there are no screenings for the selected theatre
      $("#noScreeningsAlert").show();
    } else {
      let rows = await Promise.all(filteredScreenings.map(createScreeningRow));
      screeningsTbody.append(rows.join("")); // adds all generated rows to the <tbody>,
      // .join ensures the rows are added as proper HTML rather than as an array
    }
  });
}

// Helper method to create a row for each screening
async function createScreeningRow(screening) {
  let formattedDate = new Date(screening.Date).toISOString().split("T")[0];
  let filmName = await getFilmData(screening.FilmID);

  return `<tr>
    <td>${screening.StartTime}</td>
    <td>${formattedDate}</td>
    <td>${screening.SeatsRemaining}</td>
    <td>${screening.TheatreID}</td>
    <td>${filmName}</td>
    <td><button type="button" class="updateButton btn btn-secondary" value="${screening.ScreeningID}">Update</button></td>
    <td><button type="button" class="deleteButton btn btn-danger" value="${screening.ScreeningID}">Delete</button></td>
  </tr>`;
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
