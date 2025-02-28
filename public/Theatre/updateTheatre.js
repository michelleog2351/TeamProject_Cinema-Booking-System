$(`document`).ready(function () {
  nav();
  footer();

  var ID = localStorage.getItem("ID", ID);
  $(`#fbody`).append(
    `<div class="mb-3">
        <label class="form-label" for="Capacity">Capacity</label>
        <select class="form-select" id="Capacity" name="Capacity">
        </select>
        </div>
        <br>`
  );

  getJsonData(ID);

  $("#cancel").click(function (e) {
    e.preventDefault();
    location.replace("http://localhost:3000/Theatre/Theatre.html");
  });

  $("#update").click(function (e) {
    e.preventDefault();
    let Capacity = $(`#Capacity`).val();

    $.post(`http://localhost:3000/updateTheatre/${ID}`, {
      Capacity: Capacity,
    }).done(function () {
      location.replace("http://localhost:3000/Theatre/Theatre.html");
    });
  });
});

function getJsonData(ID) {
  $.getJSON(`http://localhost:3000/Theatre/${ID}`, function (data) {
    {
        getCapacity(data.Capacity)
    }
  });
}


function getCapacity(Capacity) {
  //Retrive the data from the film
  $.getJSON(`http://localhost:3000/capacity`, function (data) {
      $.each(data, function (i, value) {
        let isSelected = (value.Capacity === Capacity) ? 'selected' : ''; 
          // IF Else to check film and select the one that is currently part of the screening
          $(`#Capacity`).append(`<option value="${value.Capacity}" ${isSelected}>${value.Capacity}</option>`);
      });
  });
}