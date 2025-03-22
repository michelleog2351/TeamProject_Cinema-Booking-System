$(document).ready(function () {
  nav();
  footer();

  // Append login form dynamically
  $("#fbody").html(`
      <label class="form-label" for="email">Email</label>
      <input class="form-control" type="email" id="email" name="email" required>
      <label class="form-label" for="password">Password</label>
      <input class="form-control" type="password" id="password" name="password" required>
      <br>
      <button class="btn btn-primary" id="login">Login</button>
  `);

  // Fix: Proper login handler
  $(document).on("click", "#login", function (e) {
    e.preventDefault();

    let email = $("#email").val();
    let password = $("#password").val();

    $.post("/login", { email, password }, function (response) {
      if (response.error) {
        alert(response.error);
      } else {
        sessionStorage.setItem("login", "true");
        sessionStorage.setItem("role", response.role); // Use role from response
        localStorage.setItem("token", response.token);

        nav();
        location.replace("index.html");
      }
    });
  });
});
