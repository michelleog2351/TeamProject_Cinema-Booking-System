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
          <input class="form-control" type="password" name="password" id="password"></input>

          <label class="form-label" for="role">Role</label>
    <select class="form-control" name="role" id="role">
      <option value="">Select Role</option>
      <option value="Manager">Manager</option>
      <option value="Admin">Admin</option>
    </select>
    <br>`
    );
  
    getJsonData(ID);
  
    $("#cancel").click(function (e) {
      location.replace("http://localhost:3000/user/user.html");
    });
  
    $("#update").click(function (e) {
      e.preventDefault();

      if ($("#name").val() == '' || $("#email").val() == '' || $(`#password`).val() == '' || $(`#role`).val() == '') {
        alert("All fields must be entered before a Sceening can be created");
        return;
      }
  
      let name = $(`#name`).val();
      let email = $(`#email`).val();
      let password = $(`#password`).val();
      let role = $(`#role`).val();

      $.post(`http://localhost:3000/updateUser/${ID}`, {
        name: name,
        email: email,
        password: password,
        role: role,
      }).done(function () {
        location.replace("http://localhost:3000/user/user.html");
      });
    });
  });
  
  function getJsonData(ID) {
    $.getJSON(`http://localhost:3000/user/${ID}`, function (data) {
      $.each(data, function (i, value) {
        $("#name").val(data.Name);
        $("#email").val(data.Email);
        $("#password").val(data.Password);
        $("#role").val(data.Role);

      });
    });
  }
  