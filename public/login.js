$(`document`).ready(function () {
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
    `);

    $("#login").click(function (e) {
        e.preventDefault(); 
    
        let user = {
            email: $("#email").val(),
            password: $("#password").val(),
            userType: $("#userType").val(),
        };
    
        $.post("http://localhost:3000/login", user)
            .done(function (response) {
                alert("Login successful!");
                localStorage.setItem("token", response.token);
                location.replace("dashboard.html");
            })
            .fail(function (xhr) {
                alert(xhr.responseJSON?.error || "Login failed.");
            });
    });

});
