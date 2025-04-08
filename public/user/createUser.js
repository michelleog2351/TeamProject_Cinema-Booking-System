$(`document`).ready(function () {
  nav();
  footer();
  $(`#fbody`).append(`
    <div class="mb-3">
        <label class="form-label" for="name">Name</label>
        <input class="form-control" type="text" name="name" id="name" required>
    </div>

    <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input class="form-control" type="email" name="email" id="email" placeholder="example@atu.ie" required>
    </div>

    <div class="mb-3">
        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="password" name="password" id="password" required>
    </div>

    <div class="mb-3">
        <label class="form-label" for="role">Role</label>
        <select class="form-control" name="role" id="role" required>
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
        </select>
    </div>
`);

  $("#cancel").click(function (e) {
    location.replace("http://localhost:3000/user/user.html");
  });

  $("#save").click(function (e) {
    if (
      $("#name").val() == "" ||
      $("#email").val() == "" ||
      $(`#password`).val() == "" ||
      $(`#role`).val() == ""
    ) {
      $("#error-message")
				.text("Please fill in all fields.")
				.show();
      return;
    }

    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let role = $("#role").val();

    $.post(`http://localhost:3000/createUser`, { name, email, password, role })
      .done(function () {
        location.replace("http://localhost:3000/user/user.html");
      })
      .fail(function (xhr) {
        alert(xhr.responseJSON?.error || "Error creating user");
      });
  });
});
