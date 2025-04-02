$(document).ready(function () {
  nav();
  footer();
  $("#fbody").append(`

        <div class="mb-3">
          <label class="form-label" for="Capacity">Capacity</label>
          <select class="form-select" id="Capacity" name="Capacity">
          </select>
        </div>
        <br>
    `);
  $("#cancel").click(function () {
    location.replace("http://localhost:3000/Theatre/Theatre.html");
  });

  $("#save").click(function () {
    let newTheatre = {
      Capacity: $(`#Capacity`).val(),
    };
    $.post(`http://localhost:3000/createTheatre`, newTheatre).done(function () {
      alert("Film created successfully!");
      location.replace("http://localhost:3000/Theatre/Theatre.html");
    });
  });
  getCapacity();
});

function getCapacity() {
  //Retrive the data from the film
  $.getJSON(`http://localhost:3000/capacity`, function (data) {
      $.each(data, function (i, value) {
          // IF Else to check film and select the one that is currently part of the screening
          $(`#Capacity`).append(`<option value="${value.Capacity}">${value.Capacity}</option>`);
      });
  });
}
