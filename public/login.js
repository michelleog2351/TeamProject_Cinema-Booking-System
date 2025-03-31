$(document).ready(function () {
  nav();
  footer();

  $("#fbody").append(`
    <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input class="form-control" type="email" id="email" name="email" placeholder="example@domain.com" required>
    </div>

    <div class="mb-3">
        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="password" id="password" name="password" required>
    </div>

    <button class="btn btn-primary" id="login">Login</button>
`);

  $(document).on("click", "#login", function (e) {
    e.preventDefault();

    let email = $("#email").val();
    let password = $("#password").val();
    let role = $("#role").val();

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
