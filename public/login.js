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
      <label class="form-label" for="email">Email</label>
      <input class="form-control" type="email" id="email" name="email" required>
      <label class="form-label" for="password">Password</label>
      <input class="form-control" type="password" id="password" name="password" required>
      <br>
      <button class="btn btn-primary" id="login">Login</button>
  `);


  $(document).on("click", "#login", function (e) {
    e.preventDefault();
  $("#login").click(function (e) {
      e.preventDefault();

      let email = $("#email").val();
      let password = $("#password").val();
      let role = $("#role").val();

      $.post("/login", { email, password }, function (response) {
        if (response.error) {
            alert(response.error);
        } else {
            sessionStorage.setItem("login", "true");
            sessionStorage.setItem("role", response.role); 
            localStorage.setItem("token", response.token); 
    
            nav();
            location.replace("index.html");
        }
    });
  });
});
