$(document).ready(function () {
  nav();
  footer();
  $("#fbody").append(`

        <label class="form-label" for="Capacity">Capacity</label>
        <input class="form-control" type="text" name="Capacity" id="Capacity" placeholder="Enter Capacity"></input>
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
});
