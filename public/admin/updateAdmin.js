$(`document`).ready(function () {
  nav();
  footer();
  var ID = localStorage.getItem("ID");
  $(`#fbody`).append(
    `<label  class="form-label" for="name">Name</label>
        <input class="form-control" type="text" name="name" id="name"></input>

        <label class="form-label" for="email">Email</label>
        <input class="form-control" type="text" name="email" id="email"></input>
        
        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="text" name="password" id="password"></input>
        <br>`
  );

  getJsonData(ID);

  $("#cancel").click(function (e) {
    location.replace("http://localhost:3000/admin/admin.html");
  });

  $("#update").click(function (e) {
    let name = $(`#name`).val();
    let email = $(`#email`).val();
    let password = $(`#password`).val();
    $.post(`http://localhost:3000/updateAdmin/${ID}`, {
      name: name,
      email: email,
      password: password,
    }).done(function () {
      location.replace("http://localhost:3000/admin/admin.html");
    });
  });
});

function getJsonData(ID) {
  $.getJSON(`http://localhost:3000/admin/${ID}`, function (data) {
   /// $.each(data, function (i, value) {
      $("#name").val(data.Name);
      $("#email").val(data.Email);
      $("#password").val(data.Password);
    // });

    $(".updateButton").click(function (e) {
      let name = e.target.value;

      $.post(`http://localhost:3000/updateAdmin`, {
        Name: name,
        Email: email,
        Password: password,
      });
    });
  });
}
