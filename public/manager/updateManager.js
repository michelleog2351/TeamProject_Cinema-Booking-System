$(`document`).ready(function () {
    nav();
    footer();
    var ID = localStorage.getItem("ID", ID);
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
      location.replace("http://localhost:3000/manager/manager.html");
    });
  
    $("#update").click(function (e) {
      e.preventDefault();
  
      let name = $(`#name`).val();
      let email = $(`#email`).val();
      let password = $(`#password`).val();
      $.post(`http://localhost:3000/updateManager/${ID}`, {
        name: name,
        email: email,
        password: password,
      }).done(function () {
        location.replace("http://localhost:3000/manager/manager.html");
      });
    });
  });
  
  function getJsonData(ID) {
    $.getJSON(`http://localhost:3000/manager/${ID}`, function (data) {
      $.each(data, function (i, value) {
        $("#name").val(data.Name);
        $("#email").val(data.Email);
        $("#password").val(data.Password);
      });
    });
  }
  