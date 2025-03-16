$(document).ready(function () {
  nav();
  footer();

  $("#fbody").append(`
        <label class="form-label" for="email">Email</label>
        <input class="form-control" type="email" id="email" name="email" required>

        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="password" id="password" name="password" required>

        <label class="form-label" for="userType">User Type</label>
        <select class="form-control" id="userType" name="userType" required>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
        </select>
        <br>
        <button class="btn btn-primary" id="login" type="button">Login</button>
    `);


  $(document).on("click", "#login", function (e) {
    e.preventDefault();

    let email = $("#email").val();
    let password = $("#password").val();
    let userType = $("#userType").val();

    $.post("/login", { email, password, userType }, function (response) {
      if (response.token) {
        alert("Invalid email or password.");
      } else {
        sessionStorage.setItem("login", "true");
        sessionStorage.setItem("userType", userType);
        localStorage.setItem("token", response.token);

        nav();
        location.replace("http://localhost:3000/index.html");
      }
    });
  });
});
