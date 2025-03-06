
$(document).ready(function () {
  nav();
  footer();
  getFilmData();
  getTheatreData();
  getStartTime();


  $("#fbody").append(`
        <div class="mb-3">
            <label  class="form-label" for="startTime">Start Time</label>
            <select class="form-select" id="startTime" name="startTime">   
            </select>
        </div>

        <div class="mb-3">
        <label class="form-label" for="date">Date</label>
        <input class="form-control" type="date" name="date" id="date"></input>
        <small id="dateWarningMessage" style="color: red; display: none;">Please enter a value</small>
        </div>

        <div class="mb-3">
        <label class="form-label" for="seatsRemaining">Seats Remaining</label>
        <input class="form-control" type="number" name="seatsRemaining" id="seatsRemaining"></input>
        <small id="warningMessage" style="color: red; display: none;">Please enter the number of remaining seats</small>
         </div>

        <div class="mb-3">
            <label class="form-label" for="theatre">Select Theatre</label>
            <select class="form-select" id="theatreSelect" name="theatre">
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label" for="films">Select Film</label>
            <select class="form-select" id="filmSelect" name="films">
            </select>
        </div>
    `);
  
  let today = new Date().toISOString().split('T')[0];
  $("#date").attr("min", today);

  $("#cancel").click(function () {
    location.replace("http://localhost:3000/screening/screening.html");
  });

  $("#save").click(async function () {
    var inputValidation = true;
    $("#warningMessage").hide(); 
    $("#dateWarningMessage").hide();

    if ($(`#seatsRemaining`).val() == '') {
      $("#warningMessage").show();
      inputValidation = false;
    }
    if ($(`#date`).val() == '' || $(`#date`).val() < today) {
      $("#dateWarningMessage").show();
      inputValidation = false;
    }
    if (!inputValidation) {
      return;
    }

    var filmID = $(`#filmSelect`).val();
    var filmRunningTime  = await getRunningTime(filmID)

    let bookedScreening = {
      theatreID: $(`#theatreSelect`).val(),
      date: $(`#date`).val(),
      startTime: $(`#startTime`).val(),
      runningTime: filmRunningTime
    };
    console.log(bookedScreening);

    $.post(`http://localhost:3000/checkScreeningAvailability`, bookedScreening).done(
      function (data) {
        if(data.length > 0)
          alert("Scrrening already booked try again")
        else
        {
          let newScreening = {
            startTime: $(`#startTime`).val(),
            date: $(`#date`).val(),
            seatsRemaining: $(`#seatsRemaining`).val(),
            theatreID: $(`#theatreSelect`).val(),
            filmID: filmID,
          };
      
          $.post(`http://localhost:3000/createScreening`, newScreening).done(
            function () {
              location.replace("http://localhost:3000/screening/screening.html");
            }
          );
        }
      }
    );
  });
});
function getFilmData() {
  //Retrive the data from the film
  $.getJSON(`http://localhost:3000/films`, function (data) {
    $.each(data, function (i, value) {
      // IF Else to check film and select the one that is currently part of the screening
      $(`#filmSelect`).append(`<option value="${value.FilmID}">${value.Name}</option>`);
    });
  });
}

function getTheatreData() {
  $.getJSON(`http://localhost:3000/Theatres`, function (data) {
    $.each(data, function (i, value) {
      $(`#theatreSelect`).append(`<option value=${value.TheatreID}>${value.TheatreID}</option>`);
    });
  });
}

function getStartTime() {
  $.getJSON(`http://localhost:3000/startTimes`, function (data) {
    $.each(data, function (i, value) {
      $(`#startTime`).append(`<option value="${value.StartTime}" >${value.StartTime}</option>`);
    });
  });
}

async function getRunningTime(filmID) {
  data = await $.getJSON(`http://localhost:3000/filmRunningTime/${filmID}`);
  console.log(data[0].RunningTime)
  return data[0].RunningTime;
}