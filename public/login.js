$(document).ready(function () {
  nav();
  footer();

  $("#fbody").append(`
    <label class="form-label" for="email">Email</label>
    <input class="form-control" type="email" id="email" name="email" required>
    <label class="form-label" for="password">Password</label>
    <input class="form-control" type="password" id="password" name="password" required>
    <br>
    <button class="btn btn-primary" id="login">Login</button>
  `);

  $("#login").click(function (e) {
    e.preventDefault();

    let email = $("#email").val();
    let password = $("#password").val();
    let role = $("#role").val();

    $.post("/login", { email, password, role }, function (response) {
      if (response.error) {
        alert(response.error); 
      } else {
        sessionStorage.setItem("login", "true");
        sessionStorage.setItem("role", role); 
        localStorage.setItem("token", response.token);
        nav();
        location.replace("http://localhost:3000/index.html");
      }
    });
  });
});
