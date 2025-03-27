$(document).ready(function () {
  nav();
  footer();

  $("#fbody").append(`
    <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input class="form-control" type="email" id="email" name="email" placeholder="Enter Email" required>
    </div>

    <div class="mb-3">
        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="password" id="password" name="password" placeholder="Enter Password" required>
    </div>

    
    <div id="error-message" class="text-danger mt-2"></div>
<div id="error-message-role" class="text-danger mt-2"></div> <!-- Second error container -->
<button class="btn btn-primary" id="login">Login</button>

  `);

  $(document).on("click", "#login", function (e) {
    e.preventDefault();

    $("#error-message").text("");

    let email = $("#email").val();
    let password = $("#password").val();

    if (!email || !password) {
      $("#error-message").text("Both email and password are required.");
      return;
    }
    

    
    $.post("/login", { email, password }, function (response) {
      if (response.error) {
        $("#error-message").text(response.error); 
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
