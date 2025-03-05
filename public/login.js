$(document).ready(function () {
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
        <button class="btn btn-primary" id="login">Login</button>
    `);

    $("#login").click(function (e) {
        e.preventDefault();  

        let user = {
            email: $("#email").val(),
            password: $("#password").val(),
            userType: $("#userType").val(),
        };

        $.ajax({
            url: "/login", 
            method: "POST",
            data: {
                email: user.email,
                password: user.password,
                userType: user.userType 
            },
            success: function (response) {
                let token = response.token;
                sessionStorage.setItem("login", "true");
                sessionStorage.setItem("userType", user.userType);
                localStorage.setItem("token", token);

                nav();
                location.replace("http://localhost:3000/index.html");
            },
            error: function (err) {
                alert("Invalid email or password.");
            }
        });
    });
});
