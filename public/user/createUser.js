$(`document`).ready(function () {
  nav();
  footer();
  $(`#fbody`).append(
    `<label class="form-label" for="name">Name</label>
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

  $("#cancel").click(function (e) {
    location.replace("http://localhost:3000/user/user.html");
  });

  $("#save").click(function (e) {
    if ($("#name").val() == '' || $("#email").val() == '' || $(`#password`).val() == '' || $(`#role`).val() == '') {
      alert("All fields must be entered before a User can be created");
      return;
    }

    let name = $(`#name`).val();
    let email = $(`#email`).val();
    let password = $(`#password`).val();
    let role = $(`#role`).val();

    $.post(`http://localhost:3000/createUser`, {
      name: name,
      email: email,
      password: password,
      role: role,
    }).done(function () {
      location.replace("http://localhost:3000/user/user.html");
    });
  });
});
