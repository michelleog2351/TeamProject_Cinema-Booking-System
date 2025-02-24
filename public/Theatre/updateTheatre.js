$(`document`).ready(function () {
  nav();
  footer();

  var ID = localStorage.getItem("ID", ID);
  $(`#fbody`).append(
    `
        <label class="form-label" for="Capacity">Capacity</label>
        <input class="form-control" type="text" name="Capacity" id="Capacity" placeholder="Enter Capacity" ></input>
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
      $("#Capacity").val(data.Capacity);
    }
  });
}
